import Project from '../infra/typeorm/entities/Project';
import AppError from '@shared/errors/AppError';
import IProjectsRepository from '../repositories/IProjectsRepository';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface Request {
  user_id: string;
  project_id: string;
  coverFileName: string;
}

@injectable()
class UpdateUserCoverService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({
    project_id,
    coverFileName,
  }: Request): Promise<Project> {
    const project = await this.projectsRepository.findById(project_id);

    if (!project)
      throw new AppError(
        'Only authenticated users can update profile cover',
        401
      );

    if (project.cover) {
      await this.storageProvider.deleteFile(project.cover);
    }

    const fileName = await this.storageProvider.saveFile(coverFileName);

    project.cover = fileName;

    await this.projectsRepository.save(project);

    return project;
  }
}

export default UpdateUserCoverService;
