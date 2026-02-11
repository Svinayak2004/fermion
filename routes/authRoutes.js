import express from 'express';
const router = express.Router();
import {signup, login, logout} from '../controller/authcontroller.js';


router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

export default router;
