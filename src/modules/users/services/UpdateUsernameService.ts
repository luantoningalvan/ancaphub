import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  id: string;
  username: string;
}

@injectable()
export default class UpdateUsernameService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ id, username }: Request): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new AppError('User does not exist');

    if (user.username === username)
      throw new AppError("You can't update your username to the same");

    const findWithTheSameUsername = await this.usersRepository.findByUsername(
      username
    );
    if (findWithTheSameUsername) throw new AppError('Username already in use');

    user.username = username;

    return this.usersRepository.save(user);
  }
}
