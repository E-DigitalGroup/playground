// src/routes/authRoutes.ts

import express from 'express';
import { signup, login } from '../controllers/authController';

const router = express.Router();

/**
 * @route POST /api/auth/signup
 * @desc Signup a new user
 * @access Public
 */
router.post('/signup', signup);

/**
 * @route POST /api/auth/login
 * @desc Login user
 * @access Public
 */
router.post('/login', login);

export default router;
