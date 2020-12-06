import { Request, Response } from 'express';

import CreatePostService from '@modules/posts/services/CreatePostService';
import ShowPostService from '@modules/posts/services/ShowPostService';
import UpdatePostService from '@modules/posts/services/UpdatePostService';
import RemovePostService from '@modules/posts/services/RemovePostService';

import { container } from 'tsyringe';

class PostsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showPost = container.resolve(ShowPostService);
    const post = await showPost.execute(id);

    return response.json(post);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { content } = request.body;
    const userId = request.user.id;

    const createPost = container.resolve(CreatePostService);

    const post = await createPost.execute({
      content,
      user_id: userId,
    });

    return response.json(post);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updatePost = container.resolve(UpdatePostService);

    const post = await updatePost.execute({
      user_id: request.user.id,
      post_id: request.params.id,
      content: request.body.content,
    });

    return response.json(post);
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const removePost = container.resolve(RemovePostService);

    await removePost.execute({
      user_id: request.user.id,
      post_id: request.params.id,
    });

    return response.status(204).json({});
  }
}

export default PostsController;
