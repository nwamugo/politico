import { Router } from 'express';

import votesController from '../controllers/votesController';
import Auth from '../auth/auth';
import validation from '../auth/validation';

const router = Router();


router.post('/', Auth.verifyToken, validation.checkVotes, votesController.vote);

export default router;
