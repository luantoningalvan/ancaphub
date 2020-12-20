import User from '../infra/typeorm/entities/User';
import IUserLocationRepository from '../repositories/IUserLocationRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowNearbyUsers {
  constructor(
    @inject('UsersLocationRepository')
    private usersLocationRepository: IUserLocationRepository
  ) {}

  public async execute(
    user_id: string,
    radius: number,
    coordinates: any
  ): Promise<User[]> {
    const users = await this.usersLocationRepository.findNearby(
      user_id,
      radius,
      coordinates
    );

    return users;
  }
}

export default ShowNearbyUsers;
