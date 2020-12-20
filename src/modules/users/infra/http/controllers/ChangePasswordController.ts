import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ChangePasswordService from '@modules/users/services/ChangePasswordService';

class ChangePasswordController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { current_password, new_password } = request.body;

    const changePassword = container.resolve(ChangePasswordService);
    await changePassword.execute({
      current_password,
      new_password,
      user_id: id,
    });

    return response.status(204).json();
  }
}

export default ChangePasswordController;
