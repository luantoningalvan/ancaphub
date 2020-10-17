import Comment from '../infra/typeorm/entities/Comment';
import IPostCommentsRepository from '../repositories/IPostCommentsRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  content: string;
  postId: string;
  authorId: string;
}

@injectable()
export default class CreatePostCommentService {
  constructor(
    @inject('PostCommentsRepository')
    private postsCommentsRepository: IPostCommentsRepository,
  ) {}

  public async execute({
    content,
    postId,
    authorId,
  }: Request): Promise<Comment> {
    const comment = await this.postsCommentsRepository.create({
      content,
      post_id: postId,
      author_id: authorId,
    });

    return comment;
  }
}
