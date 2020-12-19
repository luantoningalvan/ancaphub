import Comment from '../infra/typeorm/entities/Comment';
import IPostCommentsRepository from '../repositories/IPostCommentsRepository';
import IPostRepository from '../repositories/IPostRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

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

    @inject('PostsRepository')
    private postsRepository: IPostRepository
  ) {}

  public async execute({
    content,
    postId,
    authorId,
  }: Request): Promise<Comment> {
    const post = await this.postsRepository.findById(postId);

    if (!post) throw new AppError('A publicação a ser curtida não existe');

    const comment = await this.postsCommentsRepository.create({
      content,
      post_id: postId,
      author_id: authorId,
    });

    post.comment_count = post.comment_count + 1;

    this.postsRepository.save(post);

    return comment;
  }
}
