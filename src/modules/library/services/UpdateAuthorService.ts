import Author from '../infra/typeorm/entities/Author';
import AppError from '@shared/errors/AppError';
import IAuthorsRepository from '../repositories/IAuthorsRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  id: string;
  name?: string;
  username?: string;
  avatar?: string;
}

@injectable()
class UpdateAuthorService {
  constructor(
    @inject('AuthorsRepository')
    private authorsRepository: IAuthorsRepository,
  ) {}

  public async execute({
    id,
    avatar,
    name,
    username,
  }: Request): Promise<Author> {
    const item = await this.authorsRepository.findById(id);

    if (!item) throw new AppError('Publicação não encontrada', 401);

    if (name) {
      item.name = name;
    }

    if (username) {
      item.username = username;
    }

    if (avatar) {
      item.avatar = avatar;
    }

    await this.authorsRepository.save(item);

    return item;
  }
}

export default UpdateAuthorService;
