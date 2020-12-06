import PostLike from '../infra/typeorm/entities/PostLike';
import IPostLikesRepository from '../repositories/IPostLikesRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  postId: string;
  userId: string;
}

@injectable()
export default class CreatePostService {
  constructor(
    @inject('PostLikesRepository')
    private postLikeRepository: IPostLikesRepository,
  ) {}

  public async execute({ postId, userId }: Request): Promise<PostLike> {
    const like = await this.postLikeRepository.create({
      postId,
      userId,
    });

    return like;
  }
}
