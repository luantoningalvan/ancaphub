import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import ProjectsController from '../controllers/ProjectsController';
import ProjectDonationsController from '../controllers/ProjectDonationsController';
import ProjetFAQController from '../controllers/ProjetFAQController';
import ProjectAboutController from '../controllers/ProjectAboutController';
import ProjectAvatarController from '../controllers/ProjectAvatarController';
import ProjectCoverController from '../controllers/ProjectCoverController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import checkTokenExistence from '@modules/users/infra/http/middlewares/checkTokenExistence';

const projectsRouter = Router();
const upload = multer(uploadConfig.multer);

const projectsController = new ProjectsController();
const projectDonationsController = new ProjectDonationsController();
const projectFAQController = new ProjetFAQController();
const projectAboutController = new ProjectAboutController();
const projectAvatarController = new ProjectAvatarController();
const projectCoverController = new ProjectCoverController();

// Projects
projectsRouter.get('/', projectsController.index);
projectsRouter.get('/:id', checkTokenExistence, projectsController.show);
projectsRouter.post('/', ensureAuthenticated, projectsController.create);
projectsRouter.put('/:id', ensureAuthenticated, projectsController.update);
projectsRouter.delete('/:id', ensureAuthenticated, projectsController.remove);

// About
projectsRouter.get('/:id/about', projectAboutController.show);
projectsRouter.put(
  '/:id/about',
  ensureAuthenticated,
  projectAboutController.update
);

// FAQ
projectsRouter.get('/:id/faq', projectFAQController.show);
projectsRouter.post(
  '/:id/faq',
  ensureAuthenticated,
  projectFAQController.create
);
projectsRouter.delete(
  '/:id/faq',
  ensureAuthenticated,
  projectFAQController.remove
);

// Donations
projectsRouter.get('/:id/donations', projectDonationsController.show);
projectsRouter.post(
  '/:id/donations',
  ensureAuthenticated,
  projectDonationsController.create
);
projectsRouter.delete(
  '/:id/donations',
  ensureAuthenticated,
  projectDonationsController.remove
);

projectsRouter.patch(
  '/:id/avatar',
  ensureAuthenticated,
  upload.single('image'),
  projectAvatarController.update
);

projectsRouter.patch(
  '/:id/cover',
  ensureAuthenticated,
  upload.single('image'),
  projectCoverController.update
);

export default projectsRouter;
