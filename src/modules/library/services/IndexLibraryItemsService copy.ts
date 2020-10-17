import LibraryItem from '../infra/typeorm/entities/LibraryItem';
import ILibraryRepository from '../repositories/ILibraryRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowLibraryItemsService {
  constructor(
    @inject('LibraryRepository')
    private libraryRepository: ILibraryRepository,
  ) {}

  public async execute(): Promise<LibraryItem[]> {
    const libraryItems = await this.libraryRepository.findAll();

    return libraryItems;
  }
}

export default ShowLibraryItemsService;
