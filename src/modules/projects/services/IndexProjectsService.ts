import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute(): Promise<Project[]> {
    return await this.projectsRepository.findAll();
  }
}

export default ShowProjectService;
