import { Router } from 'express';

import LibraryController from '../controllers/LibraryController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const libraryRouter = Router();

const libraryController = new LibraryController();

libraryRouter.get('/', libraryController.index);
libraryRouter.get('/:id', libraryController.show);
libraryRouter.post('/', ensureAuthenticated, libraryController.create);
libraryRouter.put('/:id', ensureAuthenticated, libraryController.update);
libraryRouter.delete('/:id', ensureAuthenticated, libraryController.remove);

export default libraryRouter;
