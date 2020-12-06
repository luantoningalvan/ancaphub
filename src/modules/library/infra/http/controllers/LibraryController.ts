import { Request, Response } from 'express';

import IndexLibraryItemsService from '@modules/library/services/IndexLibraryItemsService copy';
import ShowLibraryItemService from '@modules/library/services/ShowLibraryItemService';
import CreateLibraryItemService from '@modules/library/services/CreateLibraryItemService';
import UpdateLibraryItemService from '@modules/library/services/UpdateLibraryItemService';
import RemoveLibraryItemService from '@modules/library/services/RemoveLibraryItemService';

import { container } from 'tsyringe';

class PostsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const indexLibraryItems = container.resolve(IndexLibraryItemsService);
    const items = await indexLibraryItems.execute();

    return response.json(items);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showLibraryItem = container.resolve(ShowLibraryItemService);
    const items = await showLibraryItem.execute(id);

    return response.json(items);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { author_id, title, type, cover } = request.body;
    const contributor_id = request.user.id;

    const createLibraryItem = container.resolve(CreateLibraryItemService);

    const post = await createLibraryItem.execute({
      author_id,
      title,
      type,
      contributor_id,
      cover,
    });

    return response.json(post);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, author_id, cover } = request.body;

    const updateLibraryItem = container.resolve(UpdateLibraryItemService);

    const item = await updateLibraryItem.execute({
      id,
      title,
      author_id,
      cover,
    });

    return response.json(item);
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const removeLibraryItem = container.resolve(RemoveLibraryItemService);

    await removeLibraryItem.execute(id);

    return response.status(204).json({});
  }
}

export default PostsController;
