import Author from '../infra/typeorm/entities/Author';
import IAuthorsRepository from '../repositories/IAuthorsRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  name: string;
  username: string;
  avatar?: string;
}

@injectable()
export default class CreateAuthorService {
  constructor(
    @inject('AuthorsRepository')
    private authorsRepository: IAuthorsRepository,
  ) {}

  public async execute({ name, username, avatar }: Request): Promise<Author> {
    const item = await this.authorsRepository.create({
      username,
      name,
      avatar,
    });

    return item;
  }
}
