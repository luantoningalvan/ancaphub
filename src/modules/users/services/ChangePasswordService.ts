import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  current_password: string;
  new_password: string;
}

@injectable()
export default class ChangePasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    user_id,
    current_password,
    new_password,
  }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User does not exist');

    const passwordMatched = await this.hashProvider.compareHash(
      current_password,
      user.password
    );

    if (!passwordMatched) throw new AppError('Incorrect old password', 401);

    user.password = await this.hashProvider.generateHash(new_password);

    await this.usersRepository.save(user);
  }
}
