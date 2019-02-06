import { Router } from 'express';

import officeController from '../controllers/officeController';
import Auth from '../auth/auth';
import validation from '../auth/validation';

const router = Router();


router.post('/:user_id/register', Auth.verifyToken, validation.checkNewCandidate, officeController.register);

router.get('/:office_id/result', Auth.verifyToken, officeController.collateAndFetch);

export default router;
