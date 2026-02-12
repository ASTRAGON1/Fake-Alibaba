const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUserProfile, updateProfile } = require('../controllers/userController');

router.post('/api/users/register', registerUser);
router.post('api/users/login', loginUser);
router.post('api/users/logout', logoutUser);
router.get('api/users/profile', getUserProfile);
router.put('/api/users/profile', updateProfile);

module.exports = router;