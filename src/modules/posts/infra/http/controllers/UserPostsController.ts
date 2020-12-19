import { Request, Response } from 'express';

import IndexUserPostsService from '@modules/posts/services/IndexUserPostsService';
import ShowUserPostsService from '@modules/posts/services/ShowUserPostsService';
import { classToClass } from 'class-transformer';

import { container } from 'tsyringe';

class UsersPostsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;

    const indexUserPosts = container.resolve(IndexUserPostsService);
    const posts = await indexUserPosts.execute(userId);

    return response.json(classToClass(posts));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;

    const showUserPosts = container.resolve(ShowUserPostsService);
    const posts = await showUserPosts.execute(username);

    return response.json(classToClass(posts));
  }
}

export default UsersPostsController;
