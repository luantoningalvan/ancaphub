import { Request, Response } from 'express';

import GetUserListService from '@modules/users/services/GetUserListService';
import ShowUserService from '@modules/users/services/ShowUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

import { container } from 'tsyringe';

class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const showUsers = container.resolve(GetUserListService);
    const users = await showUsers.execute();

    return response.json(users);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;
    const showUser = container.resolve(ShowUserService);
    const user = await showUser.execute(username);

    delete user.password;

    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, username } = request.body;
    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      username,
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  }
}

export default UsersController;
