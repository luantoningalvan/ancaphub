import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowPostFavoritesService from '@modules/posts/services/ShowPostFavoritesService';
import FavoritePost from '@modules/posts/services/FavoritePost';
import UnfavoritePost from '@modules/posts/services/UnfavoritePost';
import { classToClass } from 'class-transformer';
class PostsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const postId = request.params.postId;

    const showPostLikes = container.resolve(ShowPostFavoritesService);

    const like = await showPostLikes.execute(postId);

    return response.json(classToClass(like));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const postId = request.params.postId;
    const userId = request.user.id;

    const favoritePost = container.resolve(FavoritePost);

    const like = await favoritePost.execute({ postId, userId });

    return response.json(classToClass(like));
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const postId = request.params.postId;
    const userId = request.user.id;

    const unfavoritePost = container.resolve(UnfavoritePost);

    const like = await unfavoritePost.execute({ postId, userId });

    return response.json(classToClass(like));
  }
}

export default PostsController;
