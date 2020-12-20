import { Router } from 'express';

import PostLikesController from '../controllers/PostLikesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const postLikesRouter = Router();

const postLikes = new PostLikesController();

postLikesRouter.get('/:postId/favorites', postLikes.show);

postLikesRouter.post(
  '/:postId/favorites',
  ensureAuthenticated,
  postLikes.create
);
postLikesRouter.delete(
  '/:postId/favorites',
  ensureAuthenticated,
  postLikes.remove
);

export default postLikesRouter;
