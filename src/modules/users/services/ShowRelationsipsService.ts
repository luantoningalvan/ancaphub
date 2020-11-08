import Relationship from '../infra/typeorm/entities/Relationship';
import User from '../infra/typeorm/entities/User';
import IRelationshipsRepository from '../repositories/IRelationshipsRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

@injectable()
class ShowRelationshipsService {
  constructor(
    @inject('RelationshipsRepository')
    private relationshipsRepository: IRelationshipsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute(userId: string, relationType: string): Promise<User[]> {
    if (relationType === 'followers' || relationType === 'following') {
      const user = (await this.usersRepository.findByUsername(userId)) as User;

      const relationships = await this.relationshipsRepository.getRelationships(
        user.id,
        relationType
      );

      return relationships;
    } else {
      throw new AppError('Tipo de relação inválida', 400);
    }
  }
}

export default ShowRelationshipsService;
