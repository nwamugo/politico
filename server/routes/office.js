import { Router } from 'express';

import officeController from '../controllers/officeController';
import Auth from '../auth/auth';

const router = Router();


router.post('/user_id/register', Auth.verifyToken, officeController.register);

export default router;
