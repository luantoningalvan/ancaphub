import { getRepository, Repository } from 'typeorm';
import UserSettings from '../entities/UserSettings';
import IUsersSettingsRepository from '@modules/users/repositories/IUsersSettingsRepository';

class UsersSettingsRepository implements IUsersSettingsRepository {
  private ormRepository: Repository<UserSettings>;

  constructor() {
    this.ormRepository = getRepository(UserSettings);
  }

  public async findOrCreate(id: string): Promise<UserSettings | undefined> {
    const user = await this.ormRepository.findOne({ where: { user_id: id } });

    if (!user) {
      const newSettings = this.ormRepository.create({ user_id: id });
      return this.ormRepository.save(newSettings);
    }

    return user;
  }

  public async save(settings: UserSettings): Promise<UserSettings> {
    return this.ormRepository.save(settings);
  }
}

export default UsersSettingsRepository;
