import { getRepository, Repository } from 'typeorm';
import PostLike from '../entities/PostLike';
import IPostLikesRepository from '@modules/posts/repositories/IPostLikesRepository';

class PostLikesRepository implements IPostLikesRepository {
  private ormRepository: Repository<PostLike>;

  constructor() {
    this.ormRepository = getRepository(PostLike);
  }

  public async findByPost(postId: string): Promise<PostLike[]> {
    const likes = this.ormRepository.find({
      where: { post_id: postId },
      relations: ['user'],
    });

    return likes;
  }

  public async create(postData: {
    postId: string;
    userId: string;
  }): Promise<PostLike> {
    const like = this.ormRepository.create({
      post_id: postData.postId,
      user_id: postData.userId,
    });
    await this.ormRepository.save(like);

    return like;
  }

  public async remove(postData: {
    postId: string;
    userId: string;
  }): Promise<void> {
    await this.ormRepository.delete({
      user_id: postData.userId,
      post_id: postData.postId,
    });

    return;
  }
}

export default PostLikesRepository;
