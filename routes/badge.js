import express from 'express';
import { 
  createBadge, 
  getAllBadges, 
  getBadgeById, 
  updateBadge, 
  deleteBadge, 
  getUserBadges
} from '../controllers/badgeController.js';
import { authenticate } from '../middlewares/auth.js';
import { authorizeRoles } from '../middlewares/permission.js';
import { validateBadgeData } from '../middlewares/validateBadge.js';

const router = express.Router();
 
router.post('/', authenticate, authorizeRoles('admin'),validateBadgeData, createBadge);
 
router.get('/', authenticate, getAllBadges);
 
router.get('/:id', authenticate, getBadgeById);
 
router.put('/:id', authenticate, authorizeRoles('admin'),validateBadgeData, updateBadge);
 
router.delete('/:id', authenticate, authorizeRoles('admin'), deleteBadge);

router.get('/my-badges', authenticate, getUserBadges);

export default router;
