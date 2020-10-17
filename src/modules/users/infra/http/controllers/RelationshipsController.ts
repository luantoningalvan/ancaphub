import { Request, Response } from 'express';

import ShowRelationshipsService from '@modules/users/services/ShowRelationsipsService';
import FollowUserService from '@modules/users/services/FollowUserService';
import UnfollowUserService from '@modules/users/services/UnfollowUserService';

import { container } from 'tsyringe';

class RelationshipsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showRelationships = container.resolve(ShowRelationshipsService);
    const relationships = await showRelationships.execute();

    return response.json(relationships);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id: followedId } = request.params;
    const { id: followerId } = request.user;

    console.log(followedId, followerId);

    const createRelationships = container.resolve(FollowUserService);

    await createRelationships.execute({
      followedId,
      followerId,
    });

    return response.json({ id: followedId, isFollowing: true });
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id: followedId } = request.params;
    const { id: followerId } = request.user;

    console.log(followedId, followerId);

    const removeRelationships = container.resolve(UnfollowUserService);

    await removeRelationships.execute({
      followedId,
      followerId,
    });

    return response.json({ id: followedId, isFollowing: false });
  }
}

export default RelationshipsController;
