import express from 'express';
import * as apartmentController from '../controllers/apartmentController';
import upload from '../middleware/uploadMiddleware';

const router = express.Router();

router.post('/', upload.array('images'), apartmentController.addApartment);
router.get('/', apartmentController.getAllApartments);
router.get('/search', apartmentController.searchApartments);
router.get('/:id', apartmentController.getApartmentById);

export default router;
