const express = require("express");
const router = express.Router();
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');

router.post('api/products', createProduct);
router.get('api/products', getProducts);
router.get('api/products/:id', getProductById);
router.put('api/products/:id', updateProduct);
router.delete('api/products/:id', deleteProduct);

module.exports = router;