import { inject, injectable } from 'tsyringe';
import ICreateProfileDTO from '../dtos/ICreateProfileDTO';
import Profile from '../infra/typeorm/entities/Profile';
import IProfilesRepository from '../repositories/IProfilesRepository';

type Maybe<T> = T | undefined;

@injectable()
export default class CreateProfileService {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository
  ) {}

  public async execute(data: ICreateProfileDTO): Promise<Maybe<Profile>> {
    return await this.profilesRepository.create(data);
  }
}
