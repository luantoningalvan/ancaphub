import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface Request {
  user_id: string;
  coverFileName: string;
}

@injectable()
class UpdateUserCoverService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ user_id, coverFileName }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user)
      throw new AppError(
        'Only authenticated users can update profile cover',
        401
      );

    if (user.cover) {
      await this.storageProvider.deleteFile(user.cover);
    }

    const fileName = await this.storageProvider.saveFile(coverFileName);

    user.cover = fileName;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserCoverService;
