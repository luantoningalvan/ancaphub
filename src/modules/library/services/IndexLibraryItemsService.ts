import LibraryItem from '../infra/typeorm/entities/LibraryItem';
import ILibraryRepository from '../repositories/ILibraryRepository';
import { inject, injectable } from 'tsyringe';
import IFilterLibrary from '../dtos/IFilterLibrary';

@injectable()
class ShowLibraryItemsService {
  constructor(
    @inject('LibraryRepository')
    private libraryRepository: ILibraryRepository
  ) {}

  public async execute(filters: IFilterLibrary): Promise<LibraryItem[]> {
    const libraryItems = await this.libraryRepository.findAll(filters);

    return libraryItems;
  }
}

export default ShowLibraryItemsService;
