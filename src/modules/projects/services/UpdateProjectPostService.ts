import ProjectPost from '../infra/typeorm/entities/ProjectPost';
import AppError from '@shared/errors/AppError';
import IProjectPostsRepository from '../repositories/IProjectPostsRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
}

@injectable()
class UpdateProjectService {
  constructor(
    @inject('ProjectPostsRepository')
    private projectPostsRepository: IProjectPostsRepository,
  ) {}

  public async execute({
    id,
    content,
    thumbnail,
    title,
  }: Request): Promise<ProjectPost> {
    const post = await this.projectPostsRepository.findById(id);

    if (!post) throw new AppError('Publicação não encontrada', 401);

    if (post.title) {
      post.title = title;
    }

    if (post.content) {
      post.content = content;
    }

    if (post.thumbnail) {
      post.thumbnail = thumbnail;
    }

    await this.projectPostsRepository.save(post);

    return post;
  }
}

export default UpdateProjectService;
