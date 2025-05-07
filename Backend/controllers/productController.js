
const Product = require('../models/Product');
const nodemailer = require('nodemailer');
const getProductModel = require('../models/Product');

exports.addProduct = async (req, res) => {
  try {
    const Product = getProductModel(); // Call the function to get the model

    const { name, student, description, contact, category, image,price,userId,ownerEmail } = req.body;

    if (!name || !student || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newProduct = new Product({
      name,
      student,
      description,
      contact,
      category,
      image,
      price,
      userId,
      ownerEmail,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({ message: 'Product added successfully', product: savedProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Failed to add product', details: error.message });
  }
};
// Get products uploaded by a user
exports.getUserProducts = async (req, res) => {
  try {
const Product = getProductModel(); // CALL the function to get the model

const products = await Product.find({ userId: req.params.userId });

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    const Product = getProductModel();
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const Product = getProductModel(); // Get model
    const { category } = req.params;
    const products = await Product.find({ category: category });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const Product = getProductModel(); // Ensure model is retrieved
    const product = await Product.findByIdAndDelete(req.params.id); // Delete product by ID
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};



exports.updateProduct = async (req, res) => {
  try {
    const Product = getProductModel(); // ✅ Get the model
    const { id } = req.params;
    const { name, student, description, contact, category, image, price, userId } = req.body;

    if (!name || !student || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, student, description, contact, category, image, price, userId },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product', details: error.message });
  }
};
exports.searchProductsByName = async (req, res) => {
  try {
    const Product = getProductModel();
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: 'Search query missing' });
    }

    const products = await Product.find({
      name: { $regex: new RegExp('^'+name, 'i') } // case-insensitive
    });

    res.status(200).json(products);
  } catch (error) {
    console.error('Error searching product by name:', error);
    res.status(500).json({ error: 'Failed to search products' });
  }
};



exports.borrowProduct = async (req, res) => {
  try {
    const Product = getProductModel();
    const { userId, fromDate, toDate,totalPrice, } = req.body;
    const { productId } = req.params;
  
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.isBorrowed) return res.status(400).json({ message: 'Item already borrowed' });

    // Update product status to borrowed
    product.isBorrowed = true;
    product.borrowedBy = userId;
    product.dueDate = toDate;
    product.totalPrice=totalPrice;

    await product.save();

    // Send an email to the owner
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'benoythomas31@gmail.com', // Replace with your email
        pass: 'qdzqkgynbcbubdfi', // Replace with your email password
      },
    });

    const mailOptions = {
      from: 'benoythomas31@gmail.com',
      to: product.ownerEmail,  // Owner's email from the product DB
      subject: 'Item Borrowed Notification',
      text: `Hello, your item "${product.name}" has been borrowed by User ${userId}.\n\nBorrow Details:\nFrom: ${fromDate}\nTo: ${toDate}\n\nPlease contact the borrower for further details.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Item borrowed successfully', product });
  } catch (error) {
    console.error('Error borrowing product:', error);
    res.status(500).json({ error: 'Failed to borrow product', details: error.message });
  }
};

exports.getBorrowedProducts = async (req, res) => {
  try {
    const Product = getProductModel();
    const products = await Product.find({ borrowedBy: req.params.userId });
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching borrowed products:', error);
    res.status(500).json({ error: 'Failed to fetch borrowed products' });
  }
};


exports.cancelBorrow = async (req, res) => {
  try {
    const Product = getProductModel();
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Set item back to available
    product.isBorrowed = false;
    product.borrowedBy = null;
    product.dueDate = null;
    product.totalPrice=null;
    await product.save();

    // Send an email to the owner about the cancellation
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'benoythomas31@gmail.com', // Replace with your email
        pass: 'qdzqkgynbcbubdfi', // Replace with your email password
      },
    });

    const mailOptions = {
      from: 'benoythomas31@gmail.com',
      to: product.ownerEmail,  // Owner's email from the product DB
      subject: 'Borrow Cancelled Notification',
      text: `Hello, the borrow for your item "${product.name}" has been cancelled.\n\nThe item is now available for others to borrow.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Borrow cancelled, item is now available', product });
  } catch (error) {
    console.error('Error cancelling borrow:', error);
    res.status(500).json({ error: 'Failed to cancel borrow', details: error.message });
  }
};
