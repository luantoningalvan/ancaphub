import ICreateProfileDTO from '../dtos/ICreateProfileDTO';
import Profile from '../infra/typeorm/entities/Profile';

type Maybe<T> = T | undefined;

export default interface IProfilesRepository {
  findById(id: string): Promise<Maybe<Profile>>;
  findByUser(user: string): Promise<Maybe<Profile>>;
  findByHandle(handle: string): Promise<Maybe<Profile>>;
  save(profile: Profile): Promise<Profile>;
  create(data: ICreateProfileDTO): Promise<Maybe<Profile>>;
}
