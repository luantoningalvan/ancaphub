import Post from '../infra/typeorm/entities/Post';
import AppError from '@shared/errors/AppError';
import IPostRepository from '../repositories/IPostRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  user_id: string;
  post_id: string;
  content: string;
}

@injectable()
class UpdatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostRepository,
  ) {}

  public async execute({ user_id, post_id, content }: Request): Promise<Post> {
    const post = await this.postsRepository.findById(post_id);

    if (!post) throw new AppError('Publicação não encontrada', 401);

    if (post.user_id !== user_id) {
      throw new AppError('Você não tem permissão para editar esta publicação');
    }

    post.content = content;

    await this.postsRepository.save(post);

    return post;
  }
}

export default UpdatePostService;
