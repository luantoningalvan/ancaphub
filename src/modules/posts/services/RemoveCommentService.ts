import AppError from '@shared/errors/AppError';
import IPostCommentsRepository from '../repositories/IPostCommentsRepository';
import IPostRepository from '../repositories/IPostRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  id: string;
  author_id: string;
}

@injectable()
class RemovePostService {
  constructor(
    @inject('PostCommentsRepository')
    private postComments: IPostCommentsRepository,

    @inject('PostsRepository')
    private postsRepository: IPostRepository
  ) {}

  public async execute({ author_id, id }: Request): Promise<void> {
    const comment = await this.postComments.findById(id);

    if (!comment) throw new AppError('Comentário não encontrada', 401);

    if (comment.author_id !== author_id) {
      throw new AppError('Você não tem permissão para remover esta publicação');
    }

    console.log(comment.post_id);

    const post = await this.postsRepository.findById(comment.post_id);
    if (!post) throw new AppError('Postagem não encontrada', 401);

    post.comment_count = post.comment_count - 1;

    await this.postsRepository.save(post);

    this.postComments.remove(comment.id);
  }
}

export default RemovePostService;
