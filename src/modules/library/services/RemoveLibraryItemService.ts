import AppError from '@shared/errors/AppError';
import ILibraryRepository from '../repositories/ILibraryRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class RemoveItemLibraryService {
  constructor(
    @inject('LibraryRepository')
    private libraryRepository: ILibraryRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const item = await this.libraryRepository.findById(id);

    if (!item) throw new AppError('Item não encontrado', 401);

    this.libraryRepository.remove(item.id);
    return;
  }
}

export default RemoveItemLibraryService;
