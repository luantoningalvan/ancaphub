import { Request, Response } from 'express';

import IndexCommentsService from '@modules/posts/services/IndexCommentsService';
import CreateCommentService from '@modules/posts/services/CreateCommentService';
import UpdateCommentService from '@modules/posts/services/UpdateCommentService';
import RemoveCommentService from '@modules/posts/services/RemoveCommentService';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

class PostsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { postId } = request.params;

    const showPostComments = container.resolve(IndexCommentsService);
    const post = await showPostComments.execute(postId);

    return response.json(classToClass(post));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { content } = request.body;
    const { postId } = request.params;
    const { id: authorId } = request.user;

    const createComment = container.resolve(CreateCommentService);

    const post = await createComment.execute({
      content,
      postId,
      authorId,
    });

    return response.json(classToClass(post));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id: author_id } = request.user;
    const { content } = request.body;

    const updateComment = container.resolve(UpdateCommentService);

    const post = await updateComment.execute({
      id,
      author_id,
      content,
    });

    return response.json(classToClass(post));
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id: author_id } = request.user;

    const removeComment = container.resolve(RemoveCommentService);

    await removeComment.execute({
      id,
      author_id,
    });

    return response.status(204).json({});
  }
}

export default PostsController;
