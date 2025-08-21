import { deleteTravel, getDestinations, updateTravel } from '../controllers/travelController.js';
import { createTravel } from '../controllers/travelController.js';
import { authenticate } from '../middlewares/auth.js';
import { validateTravel } from '../middlewares/travel.js';
import { addTravelPhotos, deleteTravelPhoto, updateTravelPhoto } from '../controllers/travelPhotoController.js';
import express from 'express';
import { updatePhoto } from '../controllers/userController.js';
import { addTravelRoutes, updateTravelRoute } from '../controllers/travelRouteController.js';
import { validateAddPhotos, validateUpdatePhoto } from '../middlewares/photo.js';
import { validateAddTravelRoutes, validateUpdateTravelRoute } from '../middlewares/route.js';

const router = express.Router();

router.post('/',authenticate,validateTravel,createTravel);
router.get('/destinations',authenticate,getDestinations);
router.put('/:id', authenticate,validateTravel, updateTravel);
router.delete('/:id',authenticate,deleteTravel);

router.post('/:id/photos', authenticate,validateAddPhotos, addTravelPhotos);
router.put('/:id/photos/:id_photo', authenticate,validateUpdatePhoto, updateTravelPhoto);
router.delete('/:id/photos/:id_photo', authenticate, deleteTravelPhoto);

router.post('/:id/routes', authenticate,validateAddTravelRoutes, addTravelRoutes);
router.put('/:id/routes/:id_route', authenticate,validateUpdateTravelRoute, updateTravelRoute);
router.delete('/:id/routes/:id_route', authenticate, updatePhoto);


export default router;