import { Router } from 'express';

import ProfilesController from '../controllers/ProfilesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const profilesRouter = Router();

const profilesController = new ProfilesController();

profilesRouter.post('/', ensureAuthenticated, profilesController.create);

export default profilesRouter;
