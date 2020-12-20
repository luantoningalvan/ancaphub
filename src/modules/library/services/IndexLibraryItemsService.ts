import LibraryItem from '../infra/typeorm/entities/LibraryItem';
import ILibraryRepository from '../repositories/ILibraryRepository';
import { inject, injectable } from 'tsyringe';
import IFilterLibrary from '../dtos/IFilterLibrary';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
@injectable()
class ShowLibraryItemsService {
  constructor(
    @inject('LibraryRepository')
    private libraryRepository: ILibraryRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute(filters: IFilterLibrary): Promise<LibraryItem[]> {
    const cacheName = `library-list:${filters.type}-${filters.author_id}-${filters.category_id}-${filters.page_size}-${filters.current_page}-${filters.order_by}`;

    let libraryItems = await this.cacheProvider.recover<LibraryItem[]>(
      cacheName
    );

    if (!libraryItems) {
      libraryItems = await this.libraryRepository.findAll(filters);
      this.cacheProvider.save(cacheName, libraryItems);
    }

    return libraryItems;
  }
}

export default ShowLibraryItemsService;
