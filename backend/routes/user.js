const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateProfile
} = require('../controllers/userController');

// Public routes - anyone can register or login
router.post('/register', registerUser);
router.post('/signup', registerUser); // Alias for register
router.post('/login', loginUser);

// Protected routes - only logged-in users can access profile
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;