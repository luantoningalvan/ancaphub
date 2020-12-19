import LibraryItem from '../infra/typeorm/entities/LibraryItem';
import ILibraryRepository from '../repositories/ILibraryRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import { inject, injectable } from 'tsyringe';

interface Request {
  title: string;
  content: string;
  author_id: string;
  cover?: string;
  type: string;
  contributor_id?: string;
  video_url?: string;
}

@injectable()
export default class CreateItemLibraryService {
  constructor(
    @inject('LibraryRepository')
    private libraryRepository: ILibraryRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({
    author_id,
    title,
    type,
    contributor_id,
    cover,
    content,
    video_url,
  }: Request): Promise<LibraryItem> {
    let fileName;

    if (cover) fileName = await this.storageProvider.saveFile(cover);
    console.log(video_url);

    const item = await this.libraryRepository.create({
      author_id,
      title,
      type,
      contributor_id,
      cover,
      status: 'pending',
      content,
      video_url,
      ...(cover && { cover: fileName }),
    });

    return item;
  }
}
