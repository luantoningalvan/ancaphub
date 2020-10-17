import { getRepository, Repository } from 'typeorm';
import Relationship from '../entities/Relationship';
import IRelationshipsRepository from '@modules/users/repositories/IRelationshipsRepository';

class RelationshipsRepository implements IRelationshipsRepository {
  private ormRepository: Repository<Relationship>;

  constructor() {
    this.ormRepository = getRepository(Relationship);
  }

  public async getRelationships(
    id?: string,
    type?: 'following' | 'followers',
  ): Promise<Relationship[]> {
    if (id) {
      if (type === 'followers') {
        return this.ormRepository.find({ where: { followed_id: id } });
      }

      if (type === 'following') {
        return this.ormRepository.find({ where: { follower_id: id } });
      }

      return this.ormRepository.find({
        where: [{ follower_id: id }, { followed_id: id }],
      });
    }

    return this.ormRepository.find();
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
