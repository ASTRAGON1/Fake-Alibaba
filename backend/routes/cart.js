const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getCarts,
    addToCart,
    updateQuantity,
    removeFromCart
} = require('../controllers/cartController');

// Protected routes - only logged-in buyers can access carts
router.get('api/carts', protect, getCarts);
router.post('api/carts', protect, addToCart);
router.put('api/carts/item/:id', protect, updateQuantity);
router.delete('api/carts/item/:id', protect, removeFromCart);

module.exports = router;