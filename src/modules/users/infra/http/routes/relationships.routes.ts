import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import RelationshipsController from '../controllers/RelationshipsController';

const usersRouter = Router();

const relationshipsController = new RelationshipsController();

usersRouter.get('/:id', ensureAuthenticated, relationshipsController.show);
usersRouter.post('/:id', ensureAuthenticated, relationshipsController.create);
usersRouter.delete('/:id', ensureAuthenticated, relationshipsController.remove);

export default usersRouter;
