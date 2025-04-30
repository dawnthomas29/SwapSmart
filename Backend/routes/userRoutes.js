const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile,
  fetchUsers, 
  blockUser,
  unblockUser,
  getAdminData,
} = require('../controllers/userController');
// Register User
router.post('/reg', registerUser);

// Login User
router.post('/log', loginUser);

// Get User Profile
router.get('/profile/:userId', getUserProfile);

// Update User Profile
router.put('/profile/:userId', updateUserProfile);

// Fetch all users
router.get('/', fetchUsers);  // Route for fetching users

// Block user route
router.patch('/block/:userId', blockUser);

// Unblock user route
router.patch('/unblock/:userId', unblockUser); 

// Route for fetching admin data (added this)
router.get('/admin', getAdminData); 

module.exports = router;
