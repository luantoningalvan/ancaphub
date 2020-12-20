import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ProjectPostsController from '../controllers/ProjectPostsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const projectpPostsRouter = Router();

const projectPostsController = new ProjectPostsController();

const upload = multer(uploadConfig.multer);

projectpPostsRouter.get('/:projectId/posts', projectPostsController.index);
projectpPostsRouter.get('/:projectId/posts/:id', projectPostsController.show);
projectpPostsRouter.post(
  '/:projectId/posts',
  ensureAuthenticated,
  upload.single('cover'),
  projectPostsController.create
);
projectpPostsRouter.put(
  '/:projectId/posts/:id',
  ensureAuthenticated,
  projectPostsController.update
);
projectpPostsRouter.delete(
  '/:projectId/posts/:id',
  ensureAuthenticated,
  projectPostsController.remove
);

export default projectpPostsRouter;
