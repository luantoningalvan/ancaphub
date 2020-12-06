import Post from '../infra/typeorm/entities/Post';
import AppError from '@shared/errors/AppError';
import IPostRepository from '../repositories/IPostRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  user_id: string;
  post_id: string;
}

@injectable()
class RemovePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostRepository,
  ) {}

  public async execute({ user_id, post_id }: Request): Promise<void> {
    const post = await this.postsRepository.findById(post_id);

    if (!post) throw new AppError('Publicação não encontrada', 401);

    if (post.user_id !== user_id) {
      throw new AppError('Você não tem permissão para remover esta publicação');
    }

    this.postsRepository.remove(post.id);
    return;
  }
}

export default RemovePostService;
