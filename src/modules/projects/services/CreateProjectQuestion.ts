import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';
import ICreateProjectQuestionDTO from '../dtos/ICreateProjectQuestionDTO';

import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({
    answer,
    question,
    project_id,
  }: ICreateProjectQuestionDTO): Promise<Project> {
    try {
      const project = await this.projectsRepository.findById(project_id);

      if (!project) throw new AppError('Projeto não encontrado');

      if (project.faq === null) {
        project.faq = [{ question, answer }];
      } else {
        project.faq = [...project.faq, { question, answer }];
      }

      return await this.projectsRepository.save(project);
    } catch (error) {
      console.log(error);
    }
  }
}
