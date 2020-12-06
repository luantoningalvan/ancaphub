import { getRepository, Repository } from 'typeorm';
import LibraryItem from '../entities/LibraryItem';
import ILibraryRepository from '@modules/library/repositories/ILibraryRepository';
import ICreateLibraryItem from '@modules/library/dtos/ICreateLibraryItem';
import AppError from '@shared/errors/AppError';

class CategoriesRepository implements ILibraryRepository {
  private ormRepository: Repository<LibraryItem>;

  constructor() {
    this.ormRepository = getRepository(LibraryItem);
  }

  public async findAll(): Promise<LibraryItem[]> {
    const item = await this.ormRepository.find({ relations: ['author'] });
    return item;
  }

  public async findById(id: string): Promise<LibraryItem | undefined> {
    const item = await this.ormRepository.findOne(id);

    if (!item) throw new AppError('Item não encontrado', 404);

    return item;
  }

  public async create(postData: ICreateLibraryItem): Promise<LibraryItem> {
    const item = this.ormRepository.create(postData);
    await this.ormRepository.save(item);

    return item;
  }

  public async save(item: LibraryItem): Promise<LibraryItem> {
    return this.ormRepository.save(item);
  }

  public async remove(item: string): Promise<void> {
    await this.ormRepository.delete(item);
  }
}

export default CategoriesRepository;
