import Post from '../infra/typeorm/entities/Post';
import IPostsRepository from '../repositories/IPostRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import { inject, injectable } from 'tsyringe';

interface Request {
  content: string;
  image?: string;
  media?: string;
  user_id: string;
}

@injectable()
export default class CreatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({
    content,
    user_id,
    image,
    media,
  }: Request): Promise<Post> {
    let fileName;

    if (image) fileName = await this.storageProvider.saveFile(image);

    const post = await this.postsRepository.create({
      content,
      user_id,
      media,
      ...(image && { image: fileName }),
    });

    return post;
  }
}
