import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import UserCoverController from '../controllers/UserCoverController';
import EmailController from '../controllers/EmailController';
import UsernameController from '../controllers/UsernameController';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);

const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();
const usersCoverController = new UserCoverController();
const emailController = new EmailController();
const usernameController = new UsernameController();

usersRouter.get('/', usersController.index);
usersRouter.get('/:username', usersController.show);
usersRouter.post('/', usersController.create);

usersRouter.put('/profile', ensureAuthenticated, usersController.update);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('image'),
  usersAvatarController.update
);

usersRouter.patch(
  '/cover',
  ensureAuthenticated,
  upload.single('image'),
  usersCoverController.update
);

usersRouter.patch('/email', ensureAuthenticated, emailController.update);
usersRouter.patch('/username', ensureAuthenticated, usernameController.update);
export default usersRouter;
