import { Request, Response } from 'express';

import IndexProjectService from '@modules/projects/services/IndexProjectsService';
import ShowProjectService from '@modules/projects/services/ShowProjectService';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import UpdateProjectService from '@modules/projects/services/UpdateProjectService';
import RemoveProjectService from '@modules/projects/services/RemoveProjectService';
import { classToClass } from 'class-transformer';

import { container } from 'tsyringe';

class ProjectsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const showProjects = container.resolve(IndexProjectService);
    const projects = await showProjects.execute();

    return response.json(classToClass(projects));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showProject = container.resolve(ShowProjectService);
    const project = await showProject.execute(id);

    const group =
      request.user && request.user.id === project?.created_by
        ? ['admin']
        : ['user'];

    return response.json(classToClass(project, { groups: group }));
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

    return response.json(classToClass(project));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description, category } = request.body;

    const updateProject = container.resolve(UpdateProjectService);

    const project = await updateProject.execute({
      id,
      name,
      description,
      category,
    });

    return response.json(classToClass(project));
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const removeProject = container.resolve(RemoveProjectService);

    await removeProject.execute(id);

    return response.status(204).json({});
  }
}

export default ProjectsController;
