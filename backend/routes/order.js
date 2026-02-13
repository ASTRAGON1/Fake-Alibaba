const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    placeOrder
} = require('../controllers/orderController');

// Protected route - only logged-in buyers can place orders
router.post('api/orders', protect, placeOrder);


module.exports = router;