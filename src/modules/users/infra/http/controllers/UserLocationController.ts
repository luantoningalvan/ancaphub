import { Request, Response } from 'express';

import ShowNearbyUsers from '@modules/users/services/ShowNearbyUsers';
import UpdateUserLocation from '@modules/users/services/UpdateUserLocation';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

class UserLocationController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { radius, lastLocation } = request.body;

    const updateUserLocation = container.resolve(UpdateUserLocation);
    const showNearbyUsers = container.resolve(ShowNearbyUsers);

    const user = await updateUserLocation.execute({
      user_id: id,
      location: lastLocation,
    });

    const users = await showNearbyUsers.execute(
      user.userId,
      Number(radius),
      lastLocation
    );

    return response.json(users);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { option } = request.body;

    const updateUserLocation = container.resolve(UpdateUserLocation);

    const user = await updateUserLocation.execute({
      user_id: id,
      location: option,
    });

    return response.json(classToClass(user));
  }
}

export default UserLocationController;
