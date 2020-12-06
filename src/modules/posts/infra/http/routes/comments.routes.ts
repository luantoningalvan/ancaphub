import { Router } from 'express';

import PostCommentsController from '../controllers/PostCommentsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const postCommentsRouter = Router();

const postComments = new PostCommentsController();

postCommentsRouter.get('/:postId/comments', postComments.index);

postCommentsRouter.post(
  '/:postId/comments',
  ensureAuthenticated,
  postComments.create,
);

postCommentsRouter.put(
  '/:postId/comments/:id',
  ensureAuthenticated,
  postComments.update,
);

postCommentsRouter.delete(
  '/:postId/comments/:id',
  ensureAuthenticated,
  postComments.remove,
);

export default postCommentsRouter;
