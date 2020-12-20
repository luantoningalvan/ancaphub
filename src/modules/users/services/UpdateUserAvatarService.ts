import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface Request {
  user_id: string;
  avatarFileName: string;
  avatarPath: string;
  crop: any;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({
    user_id,
    avatarFileName,
    crop,
  }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    const { x, y, width: w, height: h } = crop.croppedAreaPixels;

    if (!user)
      throw new AppError(
        'Only authenticated users can update profile picture',
        401
      );

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName, {
      x,
      y,
      w,
      h,
    });

    user.avatar = fileName;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
