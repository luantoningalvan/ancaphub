import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  id: string;
  bio?: string;
  birthday?: Date;
  location?: string;
  name?: string;
  url?: string;
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    id,
    name,
    bio,
    birthday,
    location,
    url,
  }: Request): Promise<User> {
    const user = (await this.usersRepository.findById(id)) as User;

    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (birthday) user.birthday = birthday;
    if (location) user.location = location;
    if (url) user.url = url;

    await this.usersRepository.save(user);

    return user;
  }
}
