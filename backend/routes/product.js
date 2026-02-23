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
router.get('/all', protect, getProducts);
router.get('/:id', getProductById);
// Protected routes - only logged-in sellers can create/update/delete
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;