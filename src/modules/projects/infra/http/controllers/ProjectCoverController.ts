import { Request, Response } from 'express';

import UpdateProjectCoverService from '@modules/projects/services/UpdateGroupCoverService';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

class ProjectCoverController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateProjectCover = container.resolve(UpdateProjectCoverService);

    const project = await updateProjectCover.execute({
      user_id: request.user.id,
      project_id: request.params.project,
      coverFileName: request.file.filename,
    });

    return response.json(classToClass(project));
  }
}

export default ProjectCoverController;
