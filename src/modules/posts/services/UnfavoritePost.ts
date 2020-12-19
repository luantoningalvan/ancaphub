import IPostLikesRepository from '../repositories/IPostLikesRepository';
import IPostRepository from '../repositories/IPostRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Post from '../infra/typeorm/entities/Post';

interface Request {
  postId: string;
  userId: string;
}

@injectable()
export default class CreatePostService {
  constructor(
    @inject('PostLikesRepository')
    private postLikeRepository: IPostLikesRepository,

    @inject('PostsRepository')
    private postsRepository: IPostRepository
  ) {}

  public async execute({ postId, userId }: Request): Promise<Post> {
    const post = await this.postsRepository.findById(postId);

    if (!post) throw new AppError('A publicação a ser descurtida não existe');

    this.postLikeRepository.remove({
      postId,
      userId,
    });

    post.favorite_count = post.favorite_count - 1;

    await this.postsRepository.save(post);

    return post;
  }
}
