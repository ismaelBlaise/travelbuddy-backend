import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import { updateProfile, updatePassword,updatePhoto } from '../controllers/userController.js';

const router = express.Router();

router.put('/profile', authenticate, updateProfile);  
router.put('/password', authenticate, updatePassword);  
router.put('/photo', authenticate, updatePhoto);   

export default router;
