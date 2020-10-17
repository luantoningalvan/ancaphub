import LibraryItem from '../infra/typeorm/entities/LibraryItem';
import ICreateLibraryItem from '../dtos/ICreateLibraryItem';

interface ICategoryRepository {
  findAll(): Promise<LibraryItem[]>;
  findById(id: string): Promise<LibraryItem | undefined>;
  create(data: ICreateLibraryItem): Promise<LibraryItem>;
  save(data: LibraryItem): Promise<LibraryItem>;
  remove(id: string): void;
}

export default ICategoryRepository;
