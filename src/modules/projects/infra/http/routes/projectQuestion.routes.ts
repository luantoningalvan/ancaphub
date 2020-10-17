import { Router } from 'express';

import ProjectsController from '../controllers/ProjectsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const projectsRouter = Router();

const projectsController = new ProjectsController();

projectsRouter.post(
  '/:projectId/faq',
  ensureAuthenticated,
  projectsController.createQuestion,
);
projectsRouter.delete(
  '/:projectId/faq/:id',
  ensureAuthenticated,
  projectsController.removeQuestion,
);

export default projectsRouter;
