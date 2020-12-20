import UserSettings from '../infra/typeorm/entities/UserSettings';
import AppError from '@shared/errors/AppError';
import IUsersSettingsRepository from '../repositories/IUsersSettingsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowUserSettingsService {
  constructor(
    @inject('UsersSettingsRepository')
    private userSettings: IUsersSettingsRepository
  ) {}

  public async execute(user_id: string): Promise<UserSettings> {
    const user = await this.userSettings.findOrCreate(user_id);

    if (!user) throw new AppError('User not found');

    return user;
  }
}

export default ShowUserSettingsService;
