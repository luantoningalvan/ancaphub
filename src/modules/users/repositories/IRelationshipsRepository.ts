import Relationship from '../infra/typeorm/entities/Relationship';

interface IUsersRepository {
  getRelationships(
    id?: string,
    type?: 'following' | 'followers',
  ): Promise<Relationship[]>;
  create(data: {
    followedId: string;
    followerId: string;
  }): Promise<Relationship>;
  remove(data: { followedId: string; followerId: string }): Promise<void>;
}

export default IUsersRepository;
