import ProjectPost from '../infra/typeorm/entities/ProjectPost';
import IProjectPostsRepository from '../repositories/IProjectPostsRepository';
import { inject, injectable } from 'tsyringe';
import ICreateProjectPostDTO from '../dtos/ICreateProjectPostDTO';

@injectable()
export default class CreateProjectService {
  constructor(
    @inject('ProjectPostsRepository')
    private projectPostsRepository: IProjectPostsRepository,
  ) {}

  public async execute({
    title,
    content,
    project_id,
    author_id,
    thumbnail,
  }: ICreateProjectPostDTO): Promise<ProjectPost> {
    return await this.projectPostsRepository.create({
      title,
      content,
      project_id,
      author_id,
      thumbnail,
    });
  }
}
