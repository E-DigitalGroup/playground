// src/app.ts

/**
 * Main Application File
 * 
 * This file serves as the entry point for the Node.js application. It sets up the Express server,
 * configures middleware, connects to the database using Prisma, and defines the API routes. Additionally,
 * it includes a health check route and a global error handler to manage unexpected errors gracefully.
 */

import express, { Application, Request, Response, NextFunction } from 'express'; // Importing Express and necessary types
import dotenv from 'dotenv'; // Importing dotenv for environment variable management
import morgan from 'morgan'; // Importing morgan for HTTP request logging
import { PrismaClient } from '@prisma/client'; // Importing PrismaClient for database interactions
import authRoutes from './routes/authRoutes'; // Importing authentication routes
import productRoutes from './routes/productRoutes'; // Importing product management routes
import { logger } from './lib/utilities/logger'; // Importing custom logger utility
import testMiddleware from './lib/middleware/test'; // Importing custom test middleware

// Load environment variables from .env file into process.env
dotenv.config();

// Initialize Express application
const app: Application = express();

// Instantiate PrismaClient for database operations
const prisma = new PrismaClient();

// Define the port on which the server will listen
const PORT = process.env.PORT || 4000;

// =======================
// Middleware Configuration
// =======================

// Parse incoming JSON requests and put the parsed data in req.body
app.use(express.json());

// HTTP request logger middleware for logging requests in the 'dev' format
app.use(morgan('dev'));

// Custom test middleware for demonstrating middleware functionality
app.use(testMiddleware);

// =======================
// Route Definitions
// =======================

// Mount authentication routes under /api/auth
app.use('/api/auth', authRoutes);

// Mount product management routes under /api/products
app.use('/api/products', productRoutes);

// =======================
// Health Check Route
// =======================

/**
 * @route GET /
 * @desc Health check to verify that the server is running
 * @access Public
 */
app.get('/', (req: Request, res: Response) => {
  res.send('Node.js, Prisma, and TypeScript Boilerplate is running!');
});

// =======================
// Global Error Handler
// =======================

/**
 * Global error handling middleware.
 * 
 * This middleware catches any errors that occur in the application and sends a standardized
 * error response to the client. It also logs the error message using the custom logger.
 * 
 * @param err - The error object caught by Express
 * @param req - The incoming Express request object
 * @param res - The Express response object used to send responses
 * @param next - The next middleware function in the Express request-response cycle
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Log the error message using the custom logger
  logger.error(err.message);

  // Send a 500 Internal Server Error response with a generic error message
  res.status(500).json({ error: 'Internal Server Error' });
});

// =======================
// Start the Server
// =======================

/**
 * Start the Express server.
 * 
 * The server listens on the specified PORT and logs a message indicating that it is running.
 */
app.listen(PORT, () => {
  // Log the server start message using the custom logger
  logger.info(`Server is running on port ${PORT}`);
});
