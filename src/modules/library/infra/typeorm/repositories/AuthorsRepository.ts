import { getRepository, Repository } from 'typeorm';
import Author from '../entities/Author';
import IAuthorsRepository from '@modules/library/repositories/IAuthorsRepository';
import ICreateAuthor from '@modules/library/dtos/ICreateAuthor';
import AppError from '@shared/errors/AppError';

class AuthorsRepository implements IAuthorsRepository {
  private ormRepository: Repository<Author>;

  constructor() {
    this.ormRepository = getRepository(Author);
  }

  public async findAll(): Promise<Author[]> {
    const author = await this.ormRepository.find();
    return author;
  }

  public async findById(id: string): Promise<Author | undefined> {
    const author = await this.ormRepository.findOne(id);

    if (!author) throw new AppError('Autor não encontrado', 404);

    return author;
  }

  public async findByUsername(username: string): Promise<Author | undefined> {
    const author = await this.ormRepository.findOne({ username });
    if (!author) throw new AppError('Autor não encontrado', 404);

    return author;
  }

  public async create(postData: ICreateAuthor): Promise<Author> {
    const author = this.ormRepository.create(postData);
    await this.ormRepository.save(author);

    return author;
  }

  public async save(author: Author): Promise<Author> {
    return this.ormRepository.save(author);
  }

  public async remove(author: string): Promise<void> {
    await this.ormRepository.delete(author);
  }
}

export default AuthorsRepository;
