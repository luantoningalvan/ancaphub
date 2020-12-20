import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
  name: string;
  username: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    name,
    email,
    username,
    password,
  }: Request): Promise<User> {
    const checkEmailExists = await this.usersRepository.findByEmail(email);
    if (checkEmailExists) throw new AppError('Email adress already used');

    const checkUsernameExists = await this.usersRepository.findByUsername(
      username
    );
    if (checkUsernameExists) throw new AppError('Email adress already used');

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
