import { Router } from 'express';

import CategoriesController from '../controllers/CategoriesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const categoriesRouter = Router();

const categoriesController = new CategoriesController();

categoriesRouter.get('/', categoriesController.index);
categoriesRouter.post('/', ensureAuthenticated, categoriesController.create);
categoriesRouter.put('/:id', ensureAuthenticated, categoriesController.update);
categoriesRouter.delete(
  '/:id',
  ensureAuthenticated,
  categoriesController.remove,
);

export default categoriesRouter;
