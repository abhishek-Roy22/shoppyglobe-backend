import { model, Schema } from 'mongoose';

const cartSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const Cart = model('Cart', cartSchema);

export default Cart;
