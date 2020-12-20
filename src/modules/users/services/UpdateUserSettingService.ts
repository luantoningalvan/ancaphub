import UserSettings from '../infra/typeorm/entities/UserSettings';
import IUsersSettingsRepository from '../repositories/IUsersSettingsRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  user_id: string;
  data: {
    geolocation?: boolean;
  };
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersSettingsRepository')
    private usersSettingsRepository: IUsersSettingsRepository
  ) {}

  public async execute({ user_id, data }: Request): Promise<UserSettings> {
    const user = await this.usersSettingsRepository.findOrCreate(user_id);

    const userUpdated = {
      ...user,
      ...data,
    };

    return this.usersSettingsRepository.save(userUpdated);
  }
}

export default UpdateProfileService;
