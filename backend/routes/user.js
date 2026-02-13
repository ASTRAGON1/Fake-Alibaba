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
router.post('/api/users/register', registerUser);
router.post('api/users/login', loginUser);

// Protected routes - only logged-in users can access profile
router.post('api/users/logout', logoutUser);
router.get('api/users/profile', protect, getUserProfile);
router.put('/api/users/profile', protect, updateProfile);

module.exports = router;