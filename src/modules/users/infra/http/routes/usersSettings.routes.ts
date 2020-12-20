import { Router } from 'express';
import UserSettingsController from '../controllers/UserSettingsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const userSettingsController = new UserSettingsController();

usersRouter.get('/', ensureAuthenticated, userSettingsController.show);
usersRouter.patch('/', ensureAuthenticated, userSettingsController.update);

export default usersRouter;
