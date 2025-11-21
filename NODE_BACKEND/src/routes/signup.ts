import express from 'express';
import { saveUser,login } from '../controllers/signin_signup.controller';
import { genNewAcessToken } from '../controllers/newAccesstoken.controller';
const router=express.Router();
router.post('/signup',saveUser);
router.post('/login',login);
router.post('/newacesstoken',genNewAcessToken);
export default router;
