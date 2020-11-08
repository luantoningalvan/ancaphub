import Author from '../infra/typeorm/entities/Author';
import ICreateAuthor from '../dtos/ICreateAuthor';

interface IAuthorsRepository {
  findAll(): Promise<Author[]>;
  findById(id: string): Promise<Author | undefined>;
  findByUsername(id: string): Promise<Author | undefined>;
  create(data: ICreateAuthor): Promise<Author>;
  save(data: Author): Promise<Author>;
  remove(id: string): void;
}

export default IAuthorsRepository;
