import Post from '../infra/typeorm/entities/Post';
import AppError from '@shared/errors/AppError';
import IPostRepository from '../repositories/IPostRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowPostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostRepository,
  ) {}

  public async execute(postId: string): Promise<Post> {
    const post = await this.postsRepository.findById(postId);

    if (!post) throw new AppError('Post not found');

    return post;
  }
}

export default ShowPostService;
