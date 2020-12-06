import ICreateProfileDTO from '@modules/profiles/dtos/ICreateProfileDTO';
import CreateProfileService from '@modules/profiles/services/CreateProfileService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

/**
 * HTTP controller class for the Profile entity
 */
class ProfilesController {
  public async create(req: Request, res: Response): Promise<Response> {
    // Get authenticated user id
    const { id } = req.user;

    // Get request body
    const { handle, title, type, avatar } = req.body as ICreateProfileDTO;

    // Get service from dependency container
    const createProfile = container.resolve(CreateProfileService);

    // Create the new profile
    const profile = await createProfile.execute({
      handle,
      title,
      type,
      avatar,
      user: id,
    });

    return res.json(profile);
  }
}

export default ProfilesController;
