import express from 'express';
import {
  getCart,
  addToCart,
  updateCart,
  deleteFromCart,
} from '../controllers/cartController.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.use(authenticate);

router.get('/user', getCart);
router.post('/user', addToCart);
router.put('/user', updateCart);
router.delete('/user', deleteFromCart);

export default router;
