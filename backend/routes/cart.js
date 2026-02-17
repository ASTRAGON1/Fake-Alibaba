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
router.get('/', protect, getCarts);
router.post('/', protect, addToCart);
router.put('/item/:id', protect, updateQuantity);
router.delete('/item/:id', protect, removeFromCart);

module.exports = router;