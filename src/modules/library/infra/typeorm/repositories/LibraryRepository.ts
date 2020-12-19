import { getRepository, Repository } from 'typeorm';
import LibraryItem from '../entities/LibraryItem';
import ILibraryRepository from '@modules/library/repositories/ILibraryRepository';
import ICreateLibraryItem from '@modules/library/dtos/ICreateLibraryItem';
import IFilterLibrary from '@modules/library/dtos/IFilterLibrary';
import AppError from '@shared/errors/AppError';

class CategoriesRepository implements ILibraryRepository {
  private ormRepository: Repository<LibraryItem>;

  constructor() {
    this.ormRepository = getRepository(LibraryItem);
  }

  public async findAll(filters: IFilterLibrary): Promise<LibraryItem[]> {
    const { current_page, page_size, order_by, ...rest } = filters || {};

    const item = await this.ormRepository.find({
      relations: ['author'],
      skip: (current_page - 1) * page_size,
      take: page_size,
      where: { ...rest },
    });
    return item;
  }

  public async findById(id: string): Promise<LibraryItem | undefined> {
    const item = await this.ormRepository.findOne(id, {
      relations: ['author'],
    });

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
