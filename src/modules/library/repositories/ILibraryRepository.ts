import LibraryItem from '../infra/typeorm/entities/LibraryItem';
import ICreateLibraryItem from '../dtos/ICreateLibraryItem';
import IFilterLibrary from '../dtos/IFilterLibrary';

interface ICategoryRepository {
  findAll(filters?: IFilterLibrary): Promise<LibraryItem[]>;
  findById(id: string): Promise<LibraryItem | undefined>;
  create(data: ICreateLibraryItem): Promise<LibraryItem>;
  save(data: LibraryItem): Promise<LibraryItem>;
  remove(id: string): void;
  search(term: string): Promise<LibraryItem[]>;
}

export default ICategoryRepository;
