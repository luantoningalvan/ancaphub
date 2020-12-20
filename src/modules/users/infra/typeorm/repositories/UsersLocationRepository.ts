import { getMongoRepository, MongoRepository } from 'typeorm';
import User from '../entities/User';
import UserLocation from '../schemas/UserLocation';
import IUserLocationRepository from '@modules/users/repositories/IUserLocationRepository';
import AppError from '@shared/errors/AppError';

class UsersLocationRepository implements IUserLocationRepository {
  private ormRepository: MongoRepository<UserLocation>;

  constructor() {
    this.ormRepository = getMongoRepository(UserLocation, 'mongo');
  }

  public async findByUser(userId: string): Promise<UserLocation | undefined> {
    const user = await this.ormRepository.findOne({
      where: { userId },
    });

    if (!user) {
      const newSettings = this.ormRepository.create({ userId });
      return this.ormRepository.save(newSettings);
    }

    return user;
  }

  public async findNearby(
    userId: string,
    radius: number,
    location: any
  ): Promise<any> {
    const users = this.ormRepository.aggregateEntity([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: location },
          distanceField: 'dist',
          includeLocs: 'location',
          maxDistance: radius,
          query: { geoLocation: true, _id: { $ne: userId } },
          spherical: true,
        },
      },
    ]);

    const teste = await users.toArray();
    console.log(teste);
    return teste;
  }

  public async save(user: UserLocation): Promise<UserLocation> {
    return this.ormRepository.save(user);
  }
}

export default UsersLocationRepository;
