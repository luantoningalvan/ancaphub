import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';
import ICreateProjectQuestionDTO from '../dtos/ICreateProjectQuestionDTO';

import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { uuid } from 'uuidv4';

@injectable()
export default class CreateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) {}

  public async execute({
    answer,
    question,
    project_id,
  }: ICreateProjectQuestionDTO): Promise<Project> {
    const id = uuid();
    const project = await this.projectsRepository.findById(project_id);

    if (!project) throw new AppError('Projeto não encontrado');

    project.faq = [
      //@ts-ignore
      ...(project.faq === null ? [] : project.faq),
      { id, answer, question },
    ];

    return await this.projectsRepository.save(project);
  }
}
