import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

// define function get all cart items
export const getCartItems = async (req, res) => {
  try {
    const cartProducts = await Cart.find();
    if (!cartProducts) {
      return res.status(404).json({ message: 'No product in cart' });
    }

    return res.status(200).json({ cart: cartProducts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// define addtocart function
export async function addToCart(req, res) {
  const { productId, quantity } = req.body;

  try {
    // find this product in product collection
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product is not found' });
    }

    // find this product in cart || updating quantity if existing product in cart
    const existingCartItem = await Cart.findOne({ productId });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();

      return res.status(200).json({
        message: 'Product quantity update in cart',
        cart: existingCartItem,
      });
    }

    // creating add new item to cart
    const newCartItem = await Cart.create({
      productId,
      quantity,
    });

    return res
      .status(201)
      .json({ message: 'Successfully added to cart', cart: newCartItem });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// define function to update cart item
export async function updateCart(req, res) {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    // check quantitiy is lower or is string
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res
        .status(400)
        .json({ message: 'Quantity must be a positive integer' });
    }

    // finding the item and update the item
    const updateCartItem = await Cart.findByIdAndUpdate(
      id,
      { $set: { quantity } },
      { new: true }
    );

    if (!updateCartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    return res
      .status(200)
      .json({ message: 'Quantity update successfully', cart: updateCartItem });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// define function to remove cart item from cart
export async function removeFromCart(req, res) {
  const { id } = req.params;

  try {
    const deletedCartIem = await Cart.findByIdAndDelete(id);

    if (!deletedCartIem) {
      return res.status(404).json({ message: 'Item not found in Cart' });
    }

    return res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
