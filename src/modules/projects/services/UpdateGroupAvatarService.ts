import Project from '../infra/typeorm/entities/Project';
import AppError from '@shared/errors/AppError';
import IProjectsRepository from '../repositories/IProjectsRepository';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface Request {
  user_id: string;
  project_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({
    project_id,
    avatarFileName,
  }: Request): Promise<Project> {
    const project = await this.projectsRepository.findById(project_id);

    if (!project)
      throw new AppError(
        'Only authenticated users can update profile avatar',
        401
      );

    if (project.avatar) {
      await this.storageProvider.deleteFile(project.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    project.avatar = fileName;

    await this.projectsRepository.save(project);

    return project;
  }
}

export default UpdateUserAvatarService;
