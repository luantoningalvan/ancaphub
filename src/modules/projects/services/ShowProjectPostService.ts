import ProjectPost from '../infra/typeorm/entities/ProjectPost';
import IProjectPostsRepository from '../repositories/IProjectPostsRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

@injectable()
class ShowProjectService {
  constructor(
    @inject('ProjectPostsRepository')
    private projectPostsRepository: IProjectPostsRepository,
  ) {}

  public async execute(id: string): Promise<ProjectPost | undefined> {
    const project = await this.projectPostsRepository.findById(id);

    if (!project) throw new AppError('Postagem não encontrada');

    return project;
  }
}

export default ShowProjectService;
