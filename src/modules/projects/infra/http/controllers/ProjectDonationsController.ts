import { Request, Response } from 'express';

import ShowProjectService from '@modules/projects/services/ShowProjectService';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import RemoveProjectService from '@modules/projects/services/RemoveProjectService';

import { container } from 'tsyringe';

class ProjectsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProject = container.resolve(ShowProjectService);
    const project = await showProject.execute(id);

    return response.json(project);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id: created_by } = request.user;
    const { name, description, category } = request.body;

    const createProject = container.resolve(CreateProjectService);

    const project = await createProject.execute({
      created_by,
      name,
      description,
      category,
    });

    return response.json(project);
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const removeProject = container.resolve(RemoveProjectService);

    await removeProject.execute(id);

    return response.status(204).json({});
  }
}

export default ProjectsController;
