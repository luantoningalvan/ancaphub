import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

@injectable()
class ShowProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute(id: string): Promise<Project | undefined> {
    const project = await this.projectsRepository.findById(id);

    if (!project) throw new AppError('Projeto não encontrado');

    return project;
  }
}

export default ShowProjectService;
