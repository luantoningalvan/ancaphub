import Post from '../infra/typeorm/entities/Post';
import { inject, injectable } from 'tsyringe';

import IPostsRepository from '@modules/posts/repositories/IPostRepository';
import IPostLikesRepository from '@modules/posts/repositories/IPostLikesRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import AppError from '@shared/errors/AppError';

interface Request {
  postId: string;
  userId: string;
}

@injectable()
export default class FavoritePostSevice {
  constructor(
    @inject('PostLikesRepository')
    private postLikeRepository: IPostLikesRepository,

    @inject('PostsRepository')
    private postsRepository: IPostsRepository /*@inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository*/
  ) {}

  public async execute({ postId, userId }: Request): Promise<Post> {
    const post = await this.postsRepository.findById(postId);

    if (!post) throw new AppError('A publicação a ser curtida não existe');

    await this.postLikeRepository.create({
      postId,
      userId,
    });

    post.favorite_count = post.favorite_count + 1;

    await this.postsRepository.save(post);

    /*
    await this.notificationsRepository.create({
      recipient_id: post.user_id,
      content: `Uma pessoa curtiu sua publicação`,
    });*/

    return post;
  }
}
