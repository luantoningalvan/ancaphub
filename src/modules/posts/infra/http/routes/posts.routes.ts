import { Router } from 'express';

import PostsController from '../controllers/PostsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const passwordRouter = Router();

const postsController = new PostsController();

passwordRouter.get('/:id', postsController.show);
passwordRouter.post('/', ensureAuthenticated, postsController.create);
passwordRouter.put('/:id', ensureAuthenticated, postsController.update);
passwordRouter.delete('/:id', ensureAuthenticated, postsController.remove);

export default passwordRouter;
