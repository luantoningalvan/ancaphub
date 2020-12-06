import AppError from '@shared/errors/AppError';
import IProjectsRepository from '../repositories/IProjectsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class RemoveProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const project = await this.projectsRepository.findById(id);

    if (!project) throw new AppError('Projeto não encontrado', 401);

    this.projectsRepository.remove(project.id);
    return;
  }
}

export default RemoveProjectService;
