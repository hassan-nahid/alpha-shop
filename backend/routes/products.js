import express from 'express';
import { fetchProducts, fetchProductById } from '../controllers/productController.js';

const router = express.Router();

router.get('/', fetchProducts);
router.get('/:id', fetchProductById);

export default router;
