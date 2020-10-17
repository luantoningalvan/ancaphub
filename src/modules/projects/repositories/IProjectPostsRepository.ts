import ProjectPost from '../infra/typeorm/entities/ProjectPost';
import ICreateProjectPostDTO from '../dtos/ICreateProjectPostDTO';

interface IProjectPostsRepository {
  findAll(): Promise<ProjectPost[]>;
  findById(id: string): Promise<ProjectPost | undefined>;
  findByProject(id: string): Promise<ProjectPost[]>;
  create(data: ICreateProjectPostDTO): Promise<ProjectPost>;
  save(data: ProjectPost): Promise<ProjectPost>;
  remove(id: string): void;
}

export default IProjectPostsRepository;
