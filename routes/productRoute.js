import express from 'express';
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/product', addProduct);
productRouter.get('/products', getProducts);
productRouter.get('/products/:id', getProduct);
productRouter.put('/product/:productId', updateProduct);
productRouter.delete('/product/:productId', deleteProduct);

export default productRouter;
