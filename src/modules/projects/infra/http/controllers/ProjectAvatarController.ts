import { Request, Response } from 'express';

import UpdateGroupAvatarService from '@modules/projects/services/UpdateGroupAvatarService';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

class ProjectAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateProjectAvatar = container.resolve(UpdateGroupAvatarService);

    const project = await updateProjectAvatar.execute({
      user_id: request.user.id,
      project_id: request.params.project,
      avatarFileName: request.file.filename,
    });

    return response.json(classToClass(project));
  }
}

export default ProjectAvatarController;
