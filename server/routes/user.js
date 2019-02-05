import { Router } from 'express';

import validation from '../auth/validation';
import User from '../controllers/userController';

const router = Router();
console.log(User.signup);

// signup route (/api/v1/auth)
router.post('/signup', validation.checkSignup, User.signup);

// login route (/api/v1/auth)
router.post('/login', validation.checkLogin, User.login);


export default router;
