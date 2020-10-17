import Project from '../infra/typeorm/entities/Project';
import AppError from '@shared/errors/AppError';
import IProjectsRepository from '../repositories/IProjectsRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  id: string;
  name: string;
  category: string;
  description: string;
}

@injectable()
class UpdateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({
    id,
    name,
    description,
    category,
  }: Request): Promise<Project> {
    const project = await this.projectsRepository.findById(id);

    if (!project) throw new AppError('Publicação não encontrada', 401);

    if (project.name) {
      project.name = name;
    }

    if (project.description) {
      project.description = description;
    }

    if (project.category) {
      project.category = category;
    }

    await this.projectsRepository.save(project);

    return project;
  }
}

export default UpdateProjectService;
