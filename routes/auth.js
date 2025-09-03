import express from 'express';
import { register, login, getProfile, logout } from '../controllers/authController.js';
import { authenticate, validateLogin, validateRegister } from '../middlewares/auth.js';
import { authorizeRoles } from '../middlewares/permission.js';

const router = express.Router();

router.post('/register',validateRegister, register);
router.post('/login', validateLogin,login);
router.get('/me', authenticate, getProfile);
router.get('/logout', authenticate,authorizeRoles('user'),logout);

export default router;
