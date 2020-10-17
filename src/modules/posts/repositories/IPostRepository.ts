import Post from '../infra/typeorm/entities/Post';
import ICreatePostDTO from '../dtos/ICreatePostDTO';

interface IPostsRepository {
  create(data: ICreatePostDTO): Promise<Post>;
  save(data: ICreatePostDTO): Promise<Post>;
  findById(id: string): Promise<Post | undefined>;
  findByUser(id: string | string[]): Promise<Post[]>;
  remove(id: string): void;
}

export default IPostsRepository;
