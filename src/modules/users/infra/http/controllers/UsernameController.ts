import { Request, Response } from 'express';

import { container } from 'tsyringe';

import UpdateUsernameService from '@modules/users/services/UpdateUsernameService';
import { classToClass } from 'class-transformer';

class UsernameController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { username } = request.body;

    const updateUsername = container.resolve(UpdateUsernameService);

    const user = await updateUsername.execute({ id, username });

    return response.json(classToClass(user));
  }
}

export default UsernameController;
