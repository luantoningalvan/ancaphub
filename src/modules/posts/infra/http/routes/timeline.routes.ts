import { Router } from 'express';

import UserPostsController from '../controllers/UserPostsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const timelineRouter = Router();

const userPostsController = new UserPostsController();

timelineRouter.get('/home', ensureAuthenticated, userPostsController.index);
timelineRouter.get('/profile/:username', userPostsController.show);

export default timelineRouter;
