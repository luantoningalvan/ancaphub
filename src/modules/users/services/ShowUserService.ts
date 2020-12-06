import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowRelationshipsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findByUsername(username);

    return user;
  }
}

export default ShowRelationshipsService;
