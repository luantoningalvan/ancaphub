import { Router } from 'express';

import AuthorController from '../controllers/AuthorController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const authorRouter = Router();

const authorController = new AuthorController();

authorRouter.get('/', authorController.index);
authorRouter.get('/:username', authorController.show);
authorRouter.post('/', ensureAuthenticated, authorController.create);
authorRouter.put('/:id', ensureAuthenticated, authorController.update);
authorRouter.delete('/:id', ensureAuthenticated, authorController.remove);

export default authorRouter;
