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
router.post('/reg', registerUser);

router.post('/log', loginUser);

router.get('/profile/:userId', getUserProfile);

router.put('/profile/:userId', updateUserProfile);

router.get('/', fetchUsers);  

router.patch('/block/:userId', blockUser);

router.patch('/unblock/:userId', unblockUser); 

router.get('/admin', getAdminData); 

module.exports = router;
