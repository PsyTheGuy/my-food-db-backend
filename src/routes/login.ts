import express from 'express';
import { login } from '../controllers/login';

const loginRouter = express.Router();

loginRouter.route('/').post(login);

export { loginRouter };
