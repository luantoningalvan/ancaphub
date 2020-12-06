import LibraryItem from '../infra/typeorm/entities/LibraryItem';
import ILibraryRepository from '../repositories/ILibraryRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  title: string;
  author_id: string;
  cover?: string;
  type: string;
  contributor_id?: string;
}

@injectable()
export default class CreateItemLibraryService {
  constructor(
    @inject('LibraryRepository')
    private libraryRepository: ILibraryRepository,
  ) {}

  public async execute({
    author_id,
    title,
    type,
    contributor_id,
    cover,
  }: Request): Promise<LibraryItem> {
    const item = await this.libraryRepository.create({
      author_id,
      title,
      type,
      contributor_id,
      cover,
      status: 'pending',
    });

    return item;
  }
}
