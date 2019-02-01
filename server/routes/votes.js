import { Router } from 'express';

import votesController from '../controllers/votesController';
import Auth from '../auth/auth';

const router = Router();


router.post('/', Auth.verifyToken, votesController.vote);

export default router;
