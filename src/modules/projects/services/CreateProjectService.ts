import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';
import { inject, injectable } from 'tsyringe';
import ICreateProjectDTO from '../dtos/ICreateProjectDTO';

@injectable()
export default class CreateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({
    name,
    description,
    category,
    created_by,
  }: ICreateProjectDTO): Promise<Project> {
    return await this.projectsRepository.create({
      created_by,
      name,
      category,
      description,
    });
  }
}
