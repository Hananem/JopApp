import { Router } from "express";
import {
  signup,
  signin,
  getAllUsersData,
  deleteAccount,
  getProfileForUser,
  updatePassword,
  updateAccount,
  forgetPassword,
  getAccountsByRecoveryEmail
} from "../controllers/userController.js";
import {verifyToken}  from '../middlewares/verifyToken';

const router = express.Router();

// Public routes (no authentication required)
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/account/password/forget', forgetPassword);

// Protected routes (authentication required)
router.get('/allusers', verifyToken, getAllUsersData);
router.delete('/account/delete/:userId', verifyToken, deleteAccount);
router.get('/user/profile/:userId', verifyToken, getProfileForUser);
router.get('/account/update/:userId', verifyToken,  updateAccount);
router.put('/account/password/update/:userId', verifyToken, updatePassword);
router.get('/accounts/recoveryEmail/:recoveryEmail', verifyToken, getAccountsByRecoveryEmail);
// Logout route
router.get('/logout', verifyToken, logout);

module.exports = router;