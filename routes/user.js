import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import { updateProfile, updatePassword,updatePhoto } from '../controllers/userController.js';
import { validatePassword, validateProfile } from '../middlewares/user.js';

const router = express.Router();

router.put('/profile', authenticate,validateProfile, updateProfile);  
router.put('/password', authenticate,validatePassword, updatePassword);  
router.put('/photo', authenticate, updatePhoto);   

export default router;
