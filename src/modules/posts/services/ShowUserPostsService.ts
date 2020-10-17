import Post from '../infra/typeorm/entities/Post';
import IPostRepository from '../repositories/IPostRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import { inject, injectable } from 'tsyringe';

@injectable()
class ShowPostService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PostsRepository')
    private postsRepository: IPostRepository,
  ) {}

  public async execute(username: string): Promise<Post[]> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) throw new Error('User not found');

    const posts = await this.postsRepository.findByUser(user.id);

    return posts;
  }
}

export default ShowPostService;
