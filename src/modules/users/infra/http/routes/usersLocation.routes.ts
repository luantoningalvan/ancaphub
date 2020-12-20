import { Router } from 'express';
import UserLocationController from '../controllers/UserLocationController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersLocationRouter = Router();

const userLocationController = new UserLocationController();

usersLocationRouter.post(
  '/nearby',
  ensureAuthenticated,
  userLocationController.show
);
usersLocationRouter.patch(
  '/',
  ensureAuthenticated,
  userLocationController.update
);

export default usersLocationRouter;
