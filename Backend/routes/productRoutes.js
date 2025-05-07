const express = require('express');
const router = express.Router();
const productController  = require('../controllers/productController');

// Borrow Product Route ✅
router.post('/borrow/:productId', productController.borrowProduct);

// to cancel borrowed item (return item)
router.post('/cancelBorrow/:productId', productController.cancelBorrow);

// return borrowed items for profile display.
router.get('/borrowed/:userId', productController.getBorrowedProducts);

// Route to add a new product
router.post('/', productController.addProduct);

// Route to get all products
router.get('/', productController.getAllProducts);

// Route to get products by userId
router.get('/user/:userId', productController.getUserProducts);

// Route to delete a product by ID
router.delete('/:id', productController.deleteProduct);

// Route to update a product by ID
router.put('/:id', productController.updateProduct); // New route for updating products

// Get products by category
router.get('/category/:category', productController.getProductsByCategory);

// Search products by name
router.get('/search', productController.searchProductsByName);

module.exports = router;
