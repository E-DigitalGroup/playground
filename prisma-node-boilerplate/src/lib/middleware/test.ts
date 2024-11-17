// src/lib/middleware/test.ts

/**
 * Test Middleware
 * 
 * This middleware serves as a simple example to demonstrate how to create and use
 * custom middleware in an Express application. It performs the following actions:
 * 
 * 1. Logs a message to the console each time a request passes through it.
 * 2. Adds a custom header (`X-Test-Middleware`) to the response to indicate
 *    that the middleware has been executed.
 * 
 * This middleware can be useful for debugging purposes or as a template for
 * implementing more complex middleware functionalities.
 */

import { Request, Response, NextFunction } from 'express'; // Importing types for Express request, response, and next function

/**
 * Test Middleware Function
 * 
 * @param req - The incoming Express request object.
 * @param res - The Express response object used to send responses.
 * @param next - The next middleware function in the Express request-response cycle.
 * 
 * @returns void
 */
const testMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Log a message to the console indicating that the middleware has been executed
  console.log('Test middleware executed');

  // Add a custom header to the response to indicate middleware activity
  res.setHeader('X-Test-Middleware', 'Active');

  // Call the next middleware function in the stack
  next();
};

export default testMiddleware;
