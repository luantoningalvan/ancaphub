import Relationship from '../infra/typeorm/entities/Relationship';
import IRelationshipsRepository from '../repositories/IRelationshipsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowRelationshipsService {
  constructor(
    @inject('RelationshipsRepository')
    private relationshipsRepository: IRelationshipsRepository,
  ) {}

  public async execute(): Promise<Relationship[]> {
    const relationships = await this.relationshipsRepository.getRelationships();

    return relationships;
  }
}

export default ShowRelationshipsService;
