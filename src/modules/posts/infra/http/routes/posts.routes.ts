import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import PostsController from '../controllers/PostsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const upload = multer(uploadConfig.multer);
const passwordRouter = Router();

const postsController = new PostsController();

passwordRouter.get('/:id', postsController.show);
passwordRouter.post(
  '/',
  ensureAuthenticated,
  upload.single('file'),
  postsController.create
);
passwordRouter.put('/:id', ensureAuthenticated, postsController.update);
passwordRouter.delete('/:id', ensureAuthenticated, postsController.remove);

export default passwordRouter;
