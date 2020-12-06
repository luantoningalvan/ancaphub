import Relationship from '../infra/typeorm/entities/Relationship';
import IRelationshipsRepository from '../repositories/IRelationshipsRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  followedId: string;
  followerId: string;
}

@injectable()
export default class CreatePostService {
  constructor(
    @inject('RelationshipsRepository')
    private relationshipsRepository: IRelationshipsRepository
  ) {}

  public async execute({
    followedId,
    followerId,
  }: Request): Promise<Relationship> {
    const relationship = await this.relationshipsRepository.create({
      followedId,
      followerId,
    });

    return relationship;
  }
}
