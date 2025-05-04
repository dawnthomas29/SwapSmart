const express = require('express');
const router = express.Router();
const productController  = require('../controllers/productController');

// Route to add a new product
router.post('/', productController.addProduct);

// Route to get all products
router.get('/', productController.getAllProducts);

// Route to get products by userId
router.get('/user/:userId', productController.getUserProducts);

// Route to delete a product by ID
router.delete('/:id', productController.deleteProduct);

// Route to update a product by ID
router.put('/:id', productController.updateProduct);  // New route for updating products

router.get('/category/:category', productController.getProductsByCategory);
module.exports = router;
