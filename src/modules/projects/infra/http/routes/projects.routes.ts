import { Router } from 'express';

import ProjectsController from '../controllers/ProjectsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const projectsRouter = Router();

const projectsController = new ProjectsController();

projectsRouter.get('/', projectsController.index);
projectsRouter.get('/:id', projectsController.show);
projectsRouter.post('/', ensureAuthenticated, projectsController.create);
projectsRouter.put('/:id', ensureAuthenticated, projectsController.update);
projectsRouter.delete('/:id', ensureAuthenticated, projectsController.remove);

export default projectsRouter;
