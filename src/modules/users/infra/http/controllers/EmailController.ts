import { Request, Response } from 'express';

import { container } from 'tsyringe';

import UpdateEmailService from '@modules/users/services/UpdateEmailService';
import { classToClass } from 'class-transformer';

class EmailController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { email } = request.body;

    const updateEmail = container.resolve(UpdateEmailService);

    const user = await updateEmail.execute({ id, email });

    return response.json(classToClass(user));
  }
}

export default EmailController;
