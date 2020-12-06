import { Request, Response } from 'express';

import ShowCategoriesService from '@modules/categories/services/ShowCategoryService';
import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import UpdateCategoryService from '@modules/categories/services/UpdateCategoryService';
import RemoveCategoryService from '@modules/categories/services/RemoveCategoryService';

import { container } from 'tsyringe';

class PostsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const showCategories = container.resolve(ShowCategoriesService);
    const categories = await showCategories.execute();

    return response.json(categories);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, slug } = request.body;

    const createCategory = container.resolve(CreateCategoryService);

    const post = await createCategory.execute({
      name,
      slug,
    });

    return response.json(post);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, slug } = request.body;

    const updateCategory = container.resolve(UpdateCategoryService);

    const category = await updateCategory.execute({
      id,
      name,
      slug,
    });

    return response.json(category);
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const removeCategory = container.resolve(RemoveCategoryService);

    await removeCategory.execute(id);

    return response.status(204).json({});
  }
}

export default PostsController;
