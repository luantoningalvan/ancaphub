import Comment from '../infra/typeorm/entities/Comment';
import ICreateCommentDTO from '../dtos/ICreateCommentDTO';

interface IPostLikesRepository {
  findById(id: string): Promise<Comment | undefined>;
  findByPost(id: string): Promise<Comment[]>;
  create(data: ICreateCommentDTO): Promise<Comment>;
  save(data: ICreateCommentDTO): Promise<Comment>;
  remove(id: string): void;
}

export default IPostLikesRepository;
