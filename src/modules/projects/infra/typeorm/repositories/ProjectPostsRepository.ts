import { getRepository, Repository } from 'typeorm';
import ProjectPost from '../entities/ProjectPost';
import IProjectPostsRepository from '@modules/projects/repositories/IProjectPostsRepository';
import ICreateProjectPostDTO from '@modules/projects/dtos/ICreateProjectPostDTO';
import AppError from '@shared/errors/AppError';

class CategoriesRepository implements IProjectPostsRepository {
  private ormRepository: Repository<ProjectPost>;

  constructor() {
    this.ormRepository = getRepository(ProjectPost);
  }

  public async findAll(): Promise<ProjectPost[]> {
    return this.ormRepository.find({ relations: ['project', 'author'] });
  }

  public async findById(id: string): Promise<ProjectPost | undefined> {
    const post = await this.ormRepository.findOne(id, {
      relations: ['project', 'author'],
    });

    if (!post) throw new AppError('Publicação não encontrada', 404);

    return post;
  }

  public async findByProject(id: string): Promise<ProjectPost[]> {
    return this.ormRepository.find({
      where: { project_id: id },
      relations: ['project', 'author'],
    });
  }

  public async create(postData: ICreateProjectPostDTO): Promise<ProjectPost> {
    const post = this.ormRepository.create(postData);
    return this.ormRepository.save(post);
  }

  public async save(post: ProjectPost): Promise<ProjectPost> {
    return this.ormRepository.save(post);
  }

  public async remove(post: string): Promise<void> {
    await this.ormRepository.delete(post);
  }
}

export default CategoriesRepository;
