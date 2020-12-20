import Project from '../infra/typeorm/entities/Project';
import ICreateProjectDTO from '../dtos/ICreateProjectDTO';

interface IProjectsRepository {
  findAll(): Promise<Project[]>;
  findById(id: string): Promise<Project | undefined>;
  create(data: ICreateProjectDTO): Promise<Project>;
  save(data: Project): Promise<Project>;
  remove(id: string): void;
  search(term: string): Promise<Project[]>;
}

export default IProjectsRepository;
