import LibraryItem from '../infra/typeorm/entities/LibraryItem';
import ILibraryRepository from '../repositories/ILibraryRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowLibraryItemsService {
  constructor(
    @inject('LibraryRepository')
    private libraryRepository: ILibraryRepository,
  ) {}

  public async execute(id: string): Promise<LibraryItem | undefined> {
    const libraryItem = await this.libraryRepository.findById(id);

    return libraryItem;
  }
}

export default ShowLibraryItemsService;
