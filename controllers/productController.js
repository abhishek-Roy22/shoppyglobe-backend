import Product from '../models/productModel.js';

// define function to add new product to db
export const addProduct = async (req, res) => {
  const { name, price, description, quantity } = req.body;
  // checking all the values are getting from user
  if (!name || !price || !description || !quantity) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newProduct = await Product.create({
      name,
      price,
      description,
      quantity,
    });
    return res
      .status(201)
      .json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    return res.status(500).json({ Error: error.message });
  }
};

// define function to get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({ message: 'No products found' });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ Error: error.message });
  }
};

// define function to get single product
export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id });
    if (!product) {
      return res.status(404).json({ message: 'No product found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ Error: error.message });
  }
};

// define function to update product item fields
export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const updateFields = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ message: 'Product not found' });
    }
    //update the product fields that user give
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: { ...updateFields } },
      { new: true }
    );

    return res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// define function to delete product item
export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndUpdate(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({
      message: 'Product deleted successfully',
      product: deletedProduct,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
