import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';

import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) {}

  public async execute({
    project_id,
    id,
  }: {
    project_id: string;
    id: string;
  }): Promise<Project> {
    const project = await this.projectsRepository.findById(project_id);

    if (!project) throw new AppError('Projeto não encontrado');

    project.faq = project.faq.filter((prj: { id: string }) => prj.id !== id);

    return await this.projectsRepository.save(project);
  }
}
