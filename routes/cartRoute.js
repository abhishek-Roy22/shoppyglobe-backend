import express from 'express';
import {
  addToCart,
  getCartItems,
  removeFromCart,
  updateCart,
} from '../controllers/cartController.js';
import authMiddleware from '../authMiddleware.js';

const cartRouter = express.Router(); // create a new router instence
// in every cart route we define middleware to protect route
cartRouter.get('/cart', authMiddleware, getCartItems);
cartRouter.post('/cart', authMiddleware, addToCart);
cartRouter.put('/cart/:id', authMiddleware, updateCart);
cartRouter.delete('/cart/:id', authMiddleware, removeFromCart);

export default cartRouter;
