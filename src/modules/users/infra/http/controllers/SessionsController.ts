import { Request, Response } from 'express';

import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { classToClass } from 'class-transformer';

class SessionsController {
  public async getCurrent(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.user;

    const getUser = container.resolve(ShowProfileService);
    const user = await getUser.execute(id);
    return response.json({ user: classToClass(user) });
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);
    const { user, token } = await authenticateUser.execute({ email, password });
    return response.json({ user: classToClass(user), token });
  }
}

export default SessionsController;
