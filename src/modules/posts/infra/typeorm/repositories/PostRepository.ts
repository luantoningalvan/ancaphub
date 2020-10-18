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
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async findByUser(userId: string | string[]): Promise<Post[]> {
    const userIds = typeof userId === 'string' ? [userId] : userId;

    const posts = this.ormRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user_id')
      .where('post.user_id IN (:...authors)', { authors: userIds })
      .limit(10)
      .getMany();

    return posts;
  }

  public async create(postData: ICreatePostDTO): Promise<Post> {
    const user = this.ormRepository.create(postData);
    await this.ormRepository.save(user);

    return user;
  }

  public async save(post: Post): Promise<Post> {
    return this.ormRepository.save(post);
  }

  public async remove(post: string): Promise<void> {
    await this.ormRepository.delete(post);
  }
}

export default PostsRepository;
