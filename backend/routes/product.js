const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
// Public route - anyone can view products
router.get('/api/products', getProducts);
router.get('/api/products/:id', getProductById);
// Protected routes - only logged-in sellers can create/update/delete
router.post('/api/products', protect, createProduct);
router.put('/api/products/:id', protect, updateProduct);
router.delete('/api/products/:id', protect, deleteProduct);

module.exports = router;