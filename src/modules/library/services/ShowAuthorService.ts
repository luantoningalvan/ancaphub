import Author from '../infra/typeorm/entities/Author';
import IAuthorsRepository from '../repositories/IAuthorsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowAuthorService {
  constructor(
    @inject('AuthorsRepository')
    private authorsService: IAuthorsRepository
  ) {}

  public async execute(username: string): Promise<Author | undefined> {
    const author = await this.authorsService.findByUsername(username);

    return author;
  }
}

export default ShowAuthorService;
