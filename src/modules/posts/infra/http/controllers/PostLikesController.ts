import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FavoritePost from '@modules/posts/services/FavoritePost';
import UnfavoritePost from '@modules/posts/services/UnfavoritePost';

class PostsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const postId = request.params.postId;
    const userId = request.user.id;

    const favoritePost = container.resolve(FavoritePost);

    const like = await favoritePost.execute({ postId, userId });

    return response.json(like);
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const postId = request.params.postId;
    const userId = request.user.id;

    const unfavoritePost = container.resolve(UnfavoritePost);

    const like = await unfavoritePost.execute({ postId, userId });

    return response.json(like);
  }
}

export default PostsController;
