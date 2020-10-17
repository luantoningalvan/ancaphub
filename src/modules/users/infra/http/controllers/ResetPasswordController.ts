import { Request, Response } from 'express'

import { container } from 'tsyringe'

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

class ForgorPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPassword = container.resolve(ResetPasswordService);
    await resetPassword.execute({ password, token });

    return response.status(204).json();
  }
}

export default ForgorPasswordController;