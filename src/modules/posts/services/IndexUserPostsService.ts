import Post from '../infra/typeorm/entities/Post';
import IPostRepository from '../repositories/IPostRepository';
import IRelationshipsRepository from '@modules/users/repositories/IRelationshipsRepository';

import { inject, injectable } from 'tsyringe';

@injectable()
class ShowPostService {
  constructor(
    @inject('RelationshipsRepository')
    private relationshipsRepository: IRelationshipsRepository,

    @inject('PostsRepository')
    private postsRepository: IPostRepository,
  ) {}

  public async execute(id: string): Promise<Post[]> {
    const relationships = await this.relationshipsRepository.getRelationships(
      id,
      'following',
    );

    const relationshipsIds = relationships.map(
      relation => relation.followed_id,
    );

    const posts = await this.postsRepository.findByUser(relationshipsIds);

    return posts;
  }
}

export default ShowPostService;
