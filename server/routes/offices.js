import { Router } from 'express';

import officesController from '../controllers/officesController';

const router = Router();

// POST /offices
router.post('/', officesController.postNewOffice);

// GET /offices
router.get('/', officesController.getAllOffices);

// GET /offices/:office_id
router.get('/:office_id', officesController.getOneOffice);

export default router;
