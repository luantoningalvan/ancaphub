import { Request, Response } from 'express';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);
    const crop = JSON.parse(request.body.data);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarPath: request.file.path,
      avatarFileName: request.file.filename,
      crop,
    });

    return response.json(classToClass(user));
  }
}

export default UserAvatarController;
