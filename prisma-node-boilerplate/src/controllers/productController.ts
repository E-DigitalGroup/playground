// src/controllers/productController.ts

/**
 * Product Controller
 * 
 * This controller manages CRUD operations for products in the application.
 * It leverages Prisma for database interactions and handles the creation,
 * retrieval, updating, and deletion of product records.
 */

import { Request, Response } from 'express'; // Importing types for Express request and response
import { PrismaClient } from '@prisma/client'; // Importing PrismaClient for database operations

// Instantiate PrismaClient for interacting with the database
const prisma = new PrismaClient();

/**
 * Create Product Handler
 * 
 * This function handles the creation of a new product. It performs the following steps:
 * 1. Extracts `name` and `type` from the request body.
 * 2. Creates a new product record in the database with the provided data.
 * 3. Returns the created product in the response.
 * 
 * @param req - Express Request object containing product data
 * @param res - Express Response object for sending responses
 */
export const createProduct = async (req: Request, res: Response) => {
  // Destructure name and type from the request body
  const { name, type } = req.body;

  try {
    // Step 1: Create a new product in the database
    const product = await prisma.product.create({
      data: {
        name,
        type,
      },
    });

    // Step 2: Respond with the created product and a 201 Created status
    res.status(201).json(product);
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error('Create Product Error:', error);

    // Step 3: Respond with a 500 Internal Server Error for any unexpected issues
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Get All Products Handler
 * 
 * This function retrieves all products from the database. It performs the following steps:
 * 1. Fetches all product records from the database.
 * 2. Returns the list of products in the response.
 * 
 * @param req - Express Request object
 * @param res - Express Response object for sending responses
 */
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Step 1: Retrieve all products from the database
    const products = await prisma.product.findMany();

    // Step 2: Respond with the list of products and a 200 OK status
    res.status(200).json(products);
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error('Get All Products Error:', error);

    // Step 3: Respond with a 500 Internal Server Error for any unexpected issues
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Get Product By ID Handler
 * 
 * This function retrieves a single product by its ID. It performs the following steps:
 * 1. Extracts the product ID from the request parameters.
 * 2. Fetches the product record with the specified ID from the database.
 * 3. Returns the product if found, or a 404 Not Found error if it doesn't exist.
 * 
 * @param req - Express Request object containing product ID
 * @param res - Express Response object for sending responses
 */
export const getProductById = async (req: Request, res: Response) => {
  // Destructure id from the request parameters
  const { id } = req.params;

  try {
    // Step 1: Find the product by its unique ID
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    // Step 2: If the product does not exist, respond with a 404 Not Found error
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Step 3: Respond with the found product and a 200 OK status
    res.status(200).json(product);
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error('Get Product By ID Error:', error);

    // Step 4: Respond with a 500 Internal Server Error for any unexpected issues
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Update Product Handler
 * 
 * This function updates an existing product by its ID. It performs the following steps:
 * 1. Extracts the product ID from the request parameters and `name`, `type` from the request body.
 * 2. Attempts to update the product record in the database with the provided data.
 * 3. Returns the updated product if successful, or a 404 Not Found error if the product does not exist.
 * 
 * @param req - Express Request object containing product ID and updated data
 * @param res - Express Response object for sending responses
 */
export const updateProduct = async (req: Request, res: Response) => {
  // Destructure id from the request parameters and name, type from the request body
  const { id } = req.params;
  const { name, type } = req.body;

  try {
    // Step 1: Update the product in the database with the provided data
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, type },
    });

    // Step 2: Respond with the updated product and a 200 OK status
    res.status(200).json(product);
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error('Update Product Error:', error);

    // Step 3: If the error is due to the product not being found, respond with a 404 Not Found error
    if (error.code === 'P2025') { // Prisma-specific error code for record not found
      return res.status(404).json({ error: 'Product not found' });
    }

    // Step 4: Respond with a 500 Internal Server Error for any other unexpected issues
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Delete Product Handler
 * 
 * This function deletes a product by its ID. It performs the following steps:
 * 1. Extracts the product ID from the request parameters.
 * 2. Attempts to delete the product record from the database.
 * 3. Returns a 204 No Content status if successful, or a 404 Not Found error if the product does not exist.
 * 
 * @param req - Express Request object containing product ID
 * @param res - Express Response object for sending responses
 */
export const deleteProduct = async (req: Request, res: Response) => {
  // Destructure id from the request parameters
  const { id } = req.params;

  try {
    // Step 1: Delete the product from the database
    await prisma.product.delete({
      where: { id: Number(id) },
    });

    // Step 2: Respond with a 204 No Content status to indicate successful deletion
    res.status(204).send();
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error('Delete Product Error:', error);

    // Step 3: If the error is due to the product not being found, respond with a 404 Not Found error
    if (error.code === 'P2025') { // Prisma-specific error code for record not found
      return res.status(404).json({ error: 'Product not found' });
    }

    // Step 4: Respond with a 500 Internal Server Error for any other unexpected issues
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
