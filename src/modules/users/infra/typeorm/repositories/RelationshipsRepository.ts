import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';
import Relationship from '../entities/Relationship';
import IRelationshipsRepository from '@modules/users/repositories/IRelationshipsRepository';

class RelationshipsRepository implements IRelationshipsRepository {
  private ormRepository: Repository<Relationship>;

  constructor() {
    this.ormRepository = getRepository(Relationship);
  }

  public async getRelationships(
    id?: string,
    type?: 'following' | 'followers'
  ): Promise<User[]> {
    if (type === 'followers') {
      const followers = await this.ormRepository.find({
        where: { followed_id: id },
        relations: ['follower'],
      });
      return followers.map((relation) => relation.follower) || [];
    } else {
      const followers = await this.ormRepository.find({
        where: { follower_id: id },
        relations: ['followed'],
      });
      return followers.map((relation) => relation.followed) || [];
    }
  }

  public async create(postData: {
    followedId: string;
    followerId: string;
  }): Promise<Relationship> {
    const relationship = this.ormRepository.create({
      follower_id: postData.followerId,
      followed_id: postData.followedId,
    });
    await this.ormRepository.save(relationship);

    return relationship;
  }

  public async remove(postData: {
    followedId: string;
    followerId: string;
  }): Promise<void> {
    await this.ormRepository.delete({
      follower_id: postData.followerId,
      followed_id: postData.followedId,
    });

    return;
  }
}

export default RelationshipsRepository;
