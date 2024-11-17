// src/controllers/authController.ts

/**
 * Authentication Controller
 * 
 * This controller handles user authentication operations, including user signup and login.
 * It leverages Prisma for database interactions, bcrypt for password hashing, and JWT for
 * token-based authentication.
 */

import { Request, Response } from 'express'; // Importing types for Express request and response
import { PrismaClient } from '@prisma/client'; // Importing PrismaClient for database operations
import bcrypt from 'bcrypt'; // Importing bcrypt for hashing passwords
import jwt from 'jsonwebtoken'; // Importing jsonwebtoken for creating JWT tokens

// Instantiate PrismaClient for interacting with the database
const prisma = new PrismaClient();

// Define the number of salt rounds for bcrypt hashing
const SALT_ROUNDS = 10;

/**
 * User Signup Handler
 * 
 * This function handles the user signup process. It performs the following steps:
 * 1. Extracts email and password from the request body.
 * 2. Checks if a user with the provided email already exists.
 * 3. Hashes the password using bcrypt.
 * 4. Creates a new user record in the database.
 * 5. Generates a JWT token for the newly created user.
 * 6. Returns the JWT token in the response.
 * 
 * @param req - Express Request object containing user input
 * @param res - Express Response object for sending responses
 */
export const signup = async (req: Request, res: Response) => {
  // Destructure email and password from the request body
  const { email, password } = req.body;

  try {
    // Step 1: Check if a user with the provided email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      // If user exists, respond with a 400 Bad Request error
      return res.status(400).json({ error: 'User already exists' });
    }

    // Step 2: Hash the user's password for secure storage
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Step 3: Create a new user record in the database with the hashed password
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Step 4: Generate a JWT token for the newly created user
    const token = jwt.sign(
      { userId: user.id }, // Payload containing the user's ID
      process.env.JWT_SECRET as string, // Secret key from environment variables
      {
        expiresIn: '1h', // Token expiration time
      }
    );

    // Step 5: Respond with a 201 Created status and the JWT token
    res.status(201).json({ token });
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error('Signup Error:', error);

    // Step 6: Respond with a 500 Internal Server Error for any unexpected issues
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * User Login Handler
 * 
 * This function handles the user login process. It performs the following steps:
 * 1. Extracts email and password from the request body.
 * 2. Checks if a user with the provided email exists.
 * 3. Compares the provided password with the stored hashed password.
 * 4. Generates a JWT token if authentication is successful.
 * 5. Returns the JWT token in the response.
 * 
 * @param req - Express Request object containing user input
 * @param res - Express Response object for sending responses
 */
export const login = async (req: Request, res: Response) => {
  // Destructure email and password from the request body
  const { email, password } = req.body;

  try {
    // Step 1: Find the user by email in the database
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // If user does not exist, respond with a 400 Bad Request error
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Step 2: Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // If passwords do not match, respond with a 400 Bad Request error
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Step 3: Generate a JWT token for the authenticated user
    const token = jwt.sign(
      { userId: user.id }, // Payload containing the user's ID
      process.env.JWT_SECRET as string, // Secret key from environment variables
      {
        expiresIn: '1h', // Token expiration time
      }
    );

    // Step 4: Respond with a 200 OK status and the JWT token
    res.status(200).json({ token });
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error('Login Error:', error);

    // Step 5: Respond with a 500 Internal Server Error for any unexpected issues
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
