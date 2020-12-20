import { getRepository, Repository } from 'typeorm';
import Post from '../entities/Post';
import IPostRepository from '@modules/posts/repositories/IPostRepository';
import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';

class PostsRepository implements IPostRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository(Post);
  }

  public async findById(id: string): Promise<Post | undefined> {
    const post = await this.ormRepository.findOne(id);
    return post;
  }

  public async findByUser(userId: string | string[]): Promise<Post[]> {
    const userIds = typeof userId === 'string' ? [userId] : userId;
    if (Array.isArray(userId) && userId.length === 0) return [];

    const posts = this.ormRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user_id')
      .where('post.user_id IN (:...authors)', { authors: userIds })
      .limit(200)
      .orderBy('post.created_at', 'DESC')
      .getMany();

    return posts;
  }

  public async create(postData: ICreatePostDTO): Promise<Post> {
    const post = this.ormRepository.create(postData);
    await this.ormRepository.save(post);

    return (await this.ormRepository.findOne(post.id, {
      relations: ['user'],
    })) as Post;
  }

  public async save(post: Post): Promise<Post> {
    return this.ormRepository.save(post);
  }

  public async remove(post: string): Promise<void> {
    await this.ormRepository.delete(post);
  }
}

export default PostsRepository;
