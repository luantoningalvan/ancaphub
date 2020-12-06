import PostLike from '../infra/typeorm/entities/PostLike';

interface IPostLikesRepository {
  create(data: { postId: string; userId: string }): Promise<PostLike>;
  remove(id: { postId: string; userId: string }): void;
}

export default IPostLikesRepository;
