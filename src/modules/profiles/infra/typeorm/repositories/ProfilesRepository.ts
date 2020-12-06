import ICreateProfileDTO from '@modules/profiles/dtos/ICreateProfileDTO';
import IProfilesRepository from '@modules/profiles/repositories/IProfilesRepository';
import { getRepository, Repository } from 'typeorm';
import Profile from '../entities/Profile';

/**
 * Monad for may-be-undefined
 */
type Maybe<T> = T | undefined;

/**
 * Repository class for the Profile entity.
 * @author Vini Franco
 */
class ProfilesRepository implements IProfilesRepository {
  private readonly ormRepository: Repository<Profile>;

  constructor() {
    this.ormRepository = getRepository(Profile);
  }

  public async findById(id: string): Promise<Maybe<Profile>> {
    const profile = await this.ormRepository.findOne(id);
    return profile;
  }

  public async findByUser(user: string): Promise<Maybe<Profile>> {
    const profile = await this.ormRepository.findOne({ user });
    return profile;
  }

  public async findByHandle(handle: string): Promise<Maybe<Profile>> {
    const profile = await this.ormRepository.findOne({ handle });
    return profile;
  }

  public async create(data: ICreateProfileDTO): Promise<Maybe<Profile>> {
    const profile = this.ormRepository.create(data);
    await this.save(profile);
    return profile;
  }

  public async save(profile: Profile): Promise<Profile> {
    return this.ormRepository.save(profile);
  }
}

export default ProfilesRepository;
