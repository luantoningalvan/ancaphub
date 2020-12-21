import { getRepository, Repository, Not } from 'typeorm';
import User from '../entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { Raw } from 'typeorm';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAll(authUser: string): Promise<User[]> {
    console.log(authUser);

    const users = await this.ormRepository.find({
      relations: ['followers'],
      take: 20,
    });
    return users.map((usr) => ({
      ...usr,
      following: usr.followers.find((f) => f.followed_id === authUser) != -1,
    }));
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id, {
      relations: ['followers'],
    });
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }

  public async search(term: string): Promise<User[]> {
    const users = this.ormRepository.find({
      where: { username: Raw((alias) => `${alias} ILIKE '%${term}%'`) },
    });
    return users;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { username },
      relations: ['followers', 'following'],
    });
    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
