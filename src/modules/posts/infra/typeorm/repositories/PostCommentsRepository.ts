import { getRepository, Repository } from 'typeorm';
import Comment from '../entities/Comment';
import IPostCommentsRepository from '@modules/posts/repositories/IPostCommentsRepository';
import ICreateCommentDTO from '@modules/posts/dtos/ICreateCommentDTO';

class PostCommentsRepository implements IPostCommentsRepository {
  private ormRepository: Repository<Comment>;

  constructor() {
    this.ormRepository = getRepository(Comment);
  }

  public async findById(id: string): Promise<Comment | undefined> {
    const comment = await this.ormRepository.findOne({
      where: { id: id },
      relations: ['author'],
    });
    return comment;
  }

  public async findByPost(postId: string): Promise<Comment[]> {
    const comments = await this.ormRepository.find({
      where: { post_id: postId },
      relations: ['author'],
    });
    return comments;
  }

  public async create(postData: ICreateCommentDTO): Promise<Comment> {
    const comment = this.ormRepository.create({
      content: postData.content,
      post_id: postData.post_id,
      author_id: postData.author_id,
    });
    await this.ormRepository.save(comment);

    return this.findById(comment.id) as Promise<Comment>;
  }

  public async remove(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async save(comment: Comment): Promise<Comment> {
    return this.ormRepository.save(comment);
  }
}

export default PostCommentsRepository;
