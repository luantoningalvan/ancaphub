import { Request, Response } from 'express';

import { container } from 'tsyringe';

import UpdateUserSettingService from '@modules/users/services/UpdateUserSettingService';
import ShowUserSettingsService from '@modules/users/services/ShowUserSettingsService';

import { classToClass } from 'class-transformer';

class UserSettingsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showUserSettings = container.resolve(ShowUserSettingsService);

    const user = await showUserSettings.execute(id);

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const data = request.body;

    const updateUserSetting = container.resolve(UpdateUserSettingService);

    const user = await updateUserSetting.execute({ user_id: id, data });

    return response.json(classToClass(user));
  }
}

export default UserSettingsController;
