import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute(userId: string): Promise<User[]> {
    const users = await this.usersRepository.findAll(userId);

    return users;
  }
}

export default UpdateProfileService;
