import express from 'express';
import {registerUser} from '../controllers/users';
import {loginUser} from '../controllers/auth';

const router = express.Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

module.exports = router;
