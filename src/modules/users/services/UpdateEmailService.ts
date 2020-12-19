import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  id: string;
  email: string;
}

@injectable()
export default class UpdateEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ id, email }: Request): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new AppError('User does not exist');

    if (user.email === email)
      throw new AppError("You can't update your email to the same");

    const findWithTheSameEmail = await this.usersRepository.findByEmail(email);
    if (findWithTheSameEmail) throw new AppError('Email already in use');

    user.email = email;

    return this.usersRepository.save(user);
  }
}
