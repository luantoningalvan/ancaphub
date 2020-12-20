import UserLocation from '../infra/typeorm/schemas/UserLocation';
import User from '../infra/typeorm/entities/User';

interface IUserLocationRepository {
  findByUser(user: string): Promise<UserLocation | undefined>;
  findNearby(user: string, radius: number, location: any): Promise<User[]>;
  save(data: any): Promise<UserLocation>;
}

export default IUserLocationRepository;
