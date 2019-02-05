import { Router } from 'express';
import User from '../controllers/userController';

const router = Router();
console.log(User.signup);

// signup route (/api/v1/auth)
router.post('/signup', User.signup);

// login route (/api/v1/auth)
router.post('/login', User.login);


export default router;
