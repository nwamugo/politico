import { Router } from 'express';
import User from '../controllers/userController';

const router = Router();
console.log(User.signup);

// api routes v1 (/api/v1)
router.get('/:userId/parcels', User.getAll);

router.post('/signup', User.signup);

router.post('/login', User.login);


export default router;
