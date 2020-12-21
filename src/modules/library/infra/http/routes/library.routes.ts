import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import LibraryController from '../controllers/LibraryController';
import LibraryUploadController from '../controllers/LibraryUploadController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const libraryRouter = Router();
const upload = multer(uploadConfig.multer);

const libraryController = new LibraryController();
const libraryUploadController = new LibraryUploadController();

libraryRouter.get('/upload', ensureAuthenticated, libraryUploadController.show);

libraryRouter.get('/', libraryController.index);
libraryRouter.get('/:id', libraryController.show);
libraryRouter.post(
  '/',
  ensureAuthenticated,
  upload.single('cover'),
  libraryController.create
);
libraryRouter.put('/:id', ensureAuthenticated, libraryController.update);
libraryRouter.delete('/:id', ensureAuthenticated, libraryController.remove);

export default libraryRouter;
