import { getRepository, Repository } from 'typeorm';
import Project from '../entities/Project';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';
import AppError from '@shared/errors/AppError';

class CategoriesRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public async findAll(): Promise<Project[]> {
    const projects = await this.ormRepository.find();
    return projects;
  }

  public async findById(id: string): Promise<Project | undefined> {
    const project = await this.ormRepository.findOne(id);

    if (!project) throw new AppError('Projeto não encontrado', 404);

    return project;
  }

  public async create(postData: ICreateProjectDTO): Promise<Project> {
    const project = this.ormRepository.create(postData);
    await this.ormRepository.save(project);

    return project;
  }

  public async save(project: Project): Promise<Project> {
    return this.ormRepository.save(project);
  }

  public async remove(project: string): Promise<void> {
    await this.ormRepository.delete(project);
  }
}

export default CategoriesRepository;
