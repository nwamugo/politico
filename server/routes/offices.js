import { Router } from 'express';

import officesController from '../controllers/officesController';
import Auth from '../auth/auth';
import validation from '../auth/validation';

const router = Router();

// POST /offices
router.post('/', Auth.verifyToken, validation.checkNewOffice, officesController.postNewOffice);

// GET /offices
router.get('/', Auth.verifyToken, officesController.getAllOffices);

// GET /offices/:office_id
router.get('/:office_id', Auth.verifyToken, officesController.getOneOffice);

export default router;
