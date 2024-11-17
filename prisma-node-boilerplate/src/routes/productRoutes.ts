// src/routes/productRoutes.ts

import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import { authenticate } from '../lib/middleware/authenticate';

const router = express.Router();

/**
 * @route POST /api/products
 * @desc Create a new product
 * @access Private
 */
router.post('/', authenticate, createProduct);

/**
 * @route GET /api/products
 * @desc Get all products
 * @access Public
 */
router.get('/', getAllProducts);

/**
 * @route GET /api/products/:id
 * @desc Get a product by ID
 * @access Public
 */
router.get('/:id', getProductById);

/**
 * @route PUT /api/products/:id
 * @desc Update a product by ID
 * @access Private
 */
router.put('/:id', authenticate, updateProduct);

/**
 * @route DELETE /api/products/:id
 * @desc Delete a product by ID
 * @access Private
 */
router.delete('/:id', authenticate, deleteProduct);

export default router;
