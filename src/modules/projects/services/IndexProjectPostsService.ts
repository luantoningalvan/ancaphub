import ProjectPost from '../infra/typeorm/entities/ProjectPost';
import IProjectPostsRepository from '../repositories/IProjectPostsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowProjectService {
  constructor(
    @inject('ProjectPostsRepository')
    private projectPostsRepository: IProjectPostsRepository,
  ) {}

  public async execute(projectId: string): Promise<ProjectPost[]> {
    return this.projectPostsRepository.findByProject(projectId);
  }
}

export default ShowProjectService;
