import Comment from '../infra/typeorm/entities/Comment';
import AppError from '@shared/errors/AppError';
import IPostCommentsRepository from '../repositories/IPostCommentsRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  id: string;
  author_id: string;
  content: string;
}

@injectable()
class UpdatePostCommentService {
  constructor(
    @inject('PostCommentsRepository')
    private postCommentsRepository: IPostCommentsRepository,
  ) {}

  public async execute({ id, author_id, content }: Request): Promise<Comment> {
    const comment = await this.postCommentsRepository.findById(id);

    if (!comment) throw new AppError('Publicação não encontrada', 401);

    if (comment.author_id !== author_id) {
      throw new AppError('Você não tem permissão para editar este comentário');
    }

    comment.content = content;

    await this.postCommentsRepository.save(comment);

    return comment;
  }
}

export default UpdatePostCommentService;
