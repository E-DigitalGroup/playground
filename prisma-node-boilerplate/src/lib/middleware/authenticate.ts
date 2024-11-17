// src/middleware/authenticate.ts

/**
 * Authentication Middleware
 * 
 * This middleware function verifies the presence and validity of a JWT token in the 
 * incoming request's Authorization header. It ensures that only authenticated users 
 * can access protected routes by validating their tokens.
 */

import { Request, Response, NextFunction } from 'express'; // Importing types for Express request, response, and next function
import jwt from 'jsonwebtoken'; // Importing jsonwebtoken for token verification

/**
 * AuthRequest Interface
 * 
 * Extends the Express Request interface to include an optional `user` property.
 * This allows TypeScript to recognize the `user` property added after token verification.
 */
interface AuthRequest extends Request {
  user?: any; // You can replace `any` with a more specific type based on your JWT payload structure
}

/**
 * Authenticate Middleware Function
 * 
 * This function performs the following steps:
 * 1. Extracts the Authorization header from the incoming request.
 * 2. Checks if the Authorization header is present and properly formatted.
 * 3. Extracts the JWT token from the header.
 * 4. Verifies the token using the JWT_SECRET from environment variables.
 * 5. Attaches the decoded token payload to the `user` property of the request object.
 * 6. Calls the `next` function to pass control to the next middleware or route handler.
 * 
 * If any of the validation steps fail, it responds with a 401 Unauthorized error.
 * 
 * @param req - The incoming Express request object, extended with `user` property.
 * @param res - The Express response object used to send responses.
 * @param next - The next middleware function in the Express request-response cycle.
 */
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Step 1: Extract the Authorization header from the request
  const authHeader = req.headers.authorization;

  // Step 2: Check if the Authorization header is present
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  // Step 3: Extract the token from the Authorization header
  // Expected format: "Bearer <token>"
  const token = authHeader.split(' ')[1];

  // Step 4: Check if the token is present
  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }

  try {
    // Step 5: Verify the token using the JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Step 6: Attach the decoded payload to the `user` property of the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, respond with a 401 Unauthorized error
    return res.status(401).json({ error: 'Invalid token' });
  }
};
