import UserSettings from '../infra/typeorm/entities/UserSettings';

interface IUsersRepository {
  save(data: any): Promise<UserSettings>;
  findOrCreate(id: string): Promise<UserSettings | undefined>;
}

export default IUsersRepository;
