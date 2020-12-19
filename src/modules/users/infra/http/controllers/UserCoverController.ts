import { Request, Response } from 'express';

import UpdateUserCoverService from '@modules/users/services/UpdateUserCoverService';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

class UserCoverController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserCover = container.resolve(UpdateUserCoverService);

    const user = await updateUserCover.execute({
      user_id: request.user.id,
      coverFileName: request.file.filename,
    });

    return response.json(classToClass(user));
  }
}

export default UserCoverController;
