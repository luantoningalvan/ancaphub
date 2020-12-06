import AppError from '@shared/errors/AppError';
import IPostCommentsRepository from '../repositories/IPostCommentsRepository';
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
  ) {}

  public async execute({ author_id, id }: Request): Promise<void> {
    const comment = await this.postComments.findById(id);

    if (!comment) throw new AppError('Publicação não encontrada', 401);

    if (comment.author_id !== author_id) {
      throw new AppError('Você não tem permissão para remover esta publicação');
    }

    this.postComments.remove(comment.id);
  }
}

export default RemovePostService;
