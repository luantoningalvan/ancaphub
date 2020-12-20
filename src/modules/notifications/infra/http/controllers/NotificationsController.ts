import { Request, Response } from 'express';

import IndexNotificationsService from '@modules/notifications/services/IndexNotificationsService';

import { container } from 'tsyringe';

class AuthorsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const indexAuthorsService = container.resolve(IndexNotificationsService);
    const items = await indexAuthorsService.execute(id);

    return response.json(items);
  }
}

export default AuthorsController;
