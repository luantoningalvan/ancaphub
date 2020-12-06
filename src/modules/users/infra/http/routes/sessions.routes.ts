import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const sessionsController = new SessionsController();

usersRouter.get('/', ensureAuthenticated, sessionsController.getCurrent);
usersRouter.post('/', sessionsController.create);

export default usersRouter;
