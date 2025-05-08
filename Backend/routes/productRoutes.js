const express = require('express');
const router = express.Router();
const productController  = require('../controllers/productController');

router.post('/borrow/:productId', productController.borrowProduct);

router.post('/cancelBorrow/:productId', productController.cancelBorrow);

router.get('/borrowed/:userId', productController.getBorrowedProducts);

router.post('/', productController.addProduct);

router.get('/', productController.getAllProducts);

router.get('/user/:userId', productController.getUserProducts);

router.delete('/:id', productController.deleteProduct);

router.put('/:id', productController.updateProduct); 

router.get('/category/:category', productController.getProductsByCategory);

router.get('/search', productController.searchProductsByName);

module.exports = router;
