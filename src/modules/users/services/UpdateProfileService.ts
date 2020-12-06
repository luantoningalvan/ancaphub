import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import { inject, injectable } from 'tsyringe';

interface Request {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    email,
    name,
    old_password,
    password,
  }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found');

    if (user.email !== email) {
      const userWithUpdatedEmail = await this.usersRepository.findByEmail(
        email,
      );
      if (userWithUpdatedEmail) throw new AppError('Email already used');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password)
      throw new AppError('Old password is required to update the password');

    if (password && old_password) {
      const comparePassword = await this.hashProvider.compareHash(
        user.password,
        old_password,
      );

      if (!comparePassword) throw new AppError('Incorret old password');

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
