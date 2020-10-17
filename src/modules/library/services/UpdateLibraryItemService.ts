import LibraryItem from '../infra/typeorm/entities/LibraryItem';
import AppError from '@shared/errors/AppError';
import ILibraryRepository from '../repositories/ILibraryRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  id: string;
  title?: string;
  author_id?: string;
  cover?: string;
}

@injectable()
class UpdateItemLibraryService {
  constructor(
    @inject('LibraryRepository')
    private libraryRepository: ILibraryRepository,
  ) {}

  public async execute({
    id,
    title,
    author_id,
    cover,
  }: Request): Promise<LibraryItem> {
    const item = await this.libraryRepository.findById(id);

    if (!item) throw new AppError('Publicação não encontrada', 401);

    if (title) {
      item.title = title;
    }

    if (author_id) {
      item.author_id = author_id;
    }

    if (cover) {
      item.cover = cover;
    }

    await this.libraryRepository.save(item);

    return item;
  }
}

export default UpdateItemLibraryService;
