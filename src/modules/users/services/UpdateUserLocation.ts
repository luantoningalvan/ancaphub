import AppError from '@shared/errors/AppError';
import UserLocation from '@modules/users/infra/typeorm/schemas/UserLocation';
import IUserLocationRepository from '../repositories/IUserLocationRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  user_id: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

@injectable()
export default class UpdateUserLocation {
  constructor(
    @inject('UsersLocationRepository')
    private usersLocationRepository: IUserLocationRepository
  ) {}

  public async execute({ user_id, location }: Request): Promise<UserLocation> {
    const user = await this.usersLocationRepository.findByUser(user_id);
    if (!user) throw new AppError('User does not exist');

    user.location = {
      type: 'Point',
      coordinates: [location.latitude, location.longitude],
    };

    return this.usersLocationRepository.save(user);
  }
}
