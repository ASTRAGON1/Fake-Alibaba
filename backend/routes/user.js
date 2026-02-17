const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateProfile
} = require('../controllers/userController');

// Public routes - anyone can register or login
router.post('/register', registerUser);
router.post('/signup', registerUser);
router.post('/login', loginUser);

// Protected routes - only logged-in users can access profile
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;