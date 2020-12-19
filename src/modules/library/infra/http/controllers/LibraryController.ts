import { Request, Response } from 'express';

import IndexLibraryItemsService from '@modules/library/services/IndexLibraryItemsService';
import ShowLibraryItemService from '@modules/library/services/ShowLibraryItemService';
import CreateLibraryItemService from '@modules/library/services/CreateLibraryItemService';
import UpdateLibraryItemService from '@modules/library/services/UpdateLibraryItemService';
import RemoveLibraryItemService from '@modules/library/services/RemoveLibraryItemService';
import { classToClass } from 'class-transformer';

import { container } from 'tsyringe';

class LibraryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const {
      currentPage: current_page = 1,
      pageSize: page_size = 20,
      orderBy: order_by,
      ...query
    } = request.query;

    const indexLibraryItems = container.resolve(IndexLibraryItemsService);
    const posts = await indexLibraryItems.execute({
      current_page: Number(current_page),
      page_size: Number(page_size),
      order_by,
      ...query,
    });

    return response.json(classToClass(posts));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showLibraryItem = container.resolve(ShowLibraryItemService);
    const posts = await showLibraryItem.execute(id);

    return response.json(classToClass(posts));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { author_id, title, type, content, video_url } = request.body;

    const contributor_id = request.user.id;

    const createLibraryItem = container.resolve(CreateLibraryItemService);
    const post = await createLibraryItem.execute({
      author_id,
      title,
      type,
      contributor_id,
      content,
      video_url,
      ...(request.file && { cover: request.file.filename }),
    });

    return response.json(classToClass(post));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, author_id, cover } = request.body;

    const updateLibraryItem = container.resolve(UpdateLibraryItemService);

    const post = await updateLibraryItem.execute({
      id,
      title,
      author_id,
      cover,
    });

    return response.json(classToClass(post));
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const removeLibraryItem = container.resolve(RemoveLibraryItemService);

    await removeLibraryItem.execute(id);

    return response.status(204).json({});
  }
}

export default LibraryController;
