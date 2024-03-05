const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);
router.get('/allusers', UserController.getAllUsersData);

// Delete Account
router.delete('/account/delete/:userId', UserController.deleteAccount)



// Get Profile Data for  User
router.get('/user/profile/:userId', UserController.getProfileForUser);

// Update Password
router.put('/account/password/update/:userId', UserController.updatePassword);

// Forget Password 
router.post('/account/password/forget', UserController.forgetPassword);

// Get All Accounts Associated to a Specific Recovery Email
router.get('/accounts/recoveryEmail/:recoveryEmail', UserController.getAccountsByRecoveryEmail);


module.exports = router;