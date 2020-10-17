import Comment from '../infra/typeorm/entities/Comment';
import IPostCommentsRepository from '../repositories/IPostCommentsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class IndexCommentsService {
  constructor(
    @inject('PostCommentsRepository')
    private postCommentsRepository: IPostCommentsRepository,
  ) {}

  public async execute(postId: string): Promise<Comment[]> {
    return this.postCommentsRepository.findByPost(postId);
  }
}

export default IndexCommentsService;
