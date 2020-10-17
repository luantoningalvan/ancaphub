import { Request, Response } from 'express';

import CreateAuthorService from '@modules/library/services/CreateAuthorService';
import UpdateAuthorService from '@modules/library/services/UpdateAuthorService';
import RemoveAuthorService from '@modules/library/services/RemoveAuthorService';

import { container } from 'tsyringe';

class AuthorsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, username, avatar } = request.body;

    const createAuthor = container.resolve(CreateAuthorService);

    const post = await createAuthor.execute({
      name,
      username,
      avatar,
    });

    return response.json(post);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, username, avatar } = request.body;

    const updateAuthor = container.resolve(UpdateAuthorService);

    const item = await updateAuthor.execute({
      id,
      name,
      username,
      avatar,
    });

    return response.json(item);
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const removeAuthor = container.resolve(RemoveAuthorService);

    await removeAuthor.execute(id);

    return response.status(204).json({});
  }
}

export default AuthorsController;
