import { Request, Response } from 'express';

import GetUserListService from '@modules/users/services/GetUserListService';
import ShowUserService from '@modules/users/services/ShowUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const showUsers = container.resolve(GetUserListService);
    const users = await showUsers.execute(id);

    return response.json(classToClass(users));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;
    const showUser = container.resolve(ShowUserService);
    const user = await showUser.execute(username);

    return response.json(classToClass(user));
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

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { bio, birthday, location, name, url } = request.body;
    const { id } = request.user;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      id,
      bio,
      birthday,
      location,
      name,
      url,
    });

    return response.json(classToClass(user));
  }
}

export default UsersController;
