import Author from '../infra/typeorm/entities/Author';
import IAuthorsRepository from '../repositories/IAuthorsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class IndexAuthorsService {
  constructor(
    @inject('AuthorsRepository')
    private authorsRepository: IAuthorsRepository
  ) {}

  public async execute(): Promise<Author[]> {
    const authors = await this.authorsRepository.findAll();

    return authors;
  }
}

export default IndexAuthorsService;
