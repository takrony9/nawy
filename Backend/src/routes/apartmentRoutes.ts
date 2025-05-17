import express from 'express';
import {
  addApartment,
  getAllApartments,
  getApartmentById,
  searchApartments,
} from '../controllers/apartmentController';

const router = express.Router();

router.post('/', addApartment);
router.get('/', getAllApartments);
router.get('/:id', getApartmentById);
router.get('/search', searchApartments);
export default router;
