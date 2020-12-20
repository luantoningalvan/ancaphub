import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';
import ChangePasswordController from '../controllers/ChangePasswordController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const passwordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();
const changePasswordController = new ChangePasswordController();

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', resetPasswordController.create);
passwordRouter.patch('/', ensureAuthenticated, changePasswordController.update);

export default passwordRouter;
