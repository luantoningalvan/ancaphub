import Post from '../infra/typeorm/entities/Post';
import IPostsRepository from '../repositories/IPostRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  content: string;
  user_id: string;
}

@injectable()
export default class CreatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ content, user_id }: Request): Promise<Post> {
    const post = await this.postsRepository.create({
      content,
      user_id,
    });

    return post;
  }
}
