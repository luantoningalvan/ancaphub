import AppError from '@shared/errors/AppError';
import IProjectPostsRepository from '../repositories/IProjectPostsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class RemoveProjectService {
  constructor(
    @inject('ProjectPostsRepository')
    private projectPostsRepository: IProjectPostsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const post = await this.projectPostsRepository.findById(id);

    if (!post) throw new AppError('Postagem não encontrado', 401);

    this.projectPostsRepository.remove(post.id);
    return;
  }
}

export default RemoveProjectService;
