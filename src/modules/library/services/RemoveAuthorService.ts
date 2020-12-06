import AppError from '@shared/errors/AppError';
import IAuthorsRepository from '../repositories/IAuthorsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class RemoveAuthorService {
  constructor(
    @inject('AuthorsRepository')
    private authorsRepository: IAuthorsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const item = await this.authorsRepository.findById(id);

    if (!item) throw new AppError('Autor não encontrado', 401);

    this.authorsRepository.remove(item.id);
    return;
  }
}

export default RemoveAuthorService;
