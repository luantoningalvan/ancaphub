import Relationship from '../infra/typeorm/entities/Relationship';
import User from '../infra/typeorm/entities/User';

interface IUsersRepository {
  getRelationships(
    id?: string,
    type?: 'following' | 'followers'
  ): Promise<User[]>;
  create(data: {
    followedId: string;
    followerId: string;
  }): Promise<Relationship>;
  remove(data: { followedId: string; followerId: string }): Promise<void>;
}

export default IUsersRepository;
