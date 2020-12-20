import PostLike from '../infra/typeorm/entities/PostLike';
import IPostLikesRepository from '../repositories/IPostLikesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowPostService {
  constructor(
    @inject('PostLikesRepository')
    private postsLikesRepository: IPostLikesRepository
  ) {}

  public async execute(postId: string): Promise<PostLike[]> {
    const likes = await this.postsLikesRepository.findByPost(postId);

    return likes;
  }
}

export default ShowPostService;
