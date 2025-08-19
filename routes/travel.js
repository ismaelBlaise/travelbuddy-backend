import { getDestinations } from '../controllers/travelController.js';
import { createTravel } from '../controllers/travelController.js';
import { validateTravel } from '../middlewares/travel.js';
import express from 'express';

const router = express.Router();

router.post('/',validateTravel,createTravel);
router.get('/destinations',getDestinations);

export default router;