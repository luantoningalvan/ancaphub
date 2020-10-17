import { Request, Response } from 'express';

import IndexProjectService from '@modules/projects/services/IndexProjectsService';
import ShowProjectService from '@modules/projects/services/ShowProjectService';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import UpdateProjectService from '@modules/projects/services/UpdateProjectService';
import RemoveProjectService from '@modules/projects/services/RemoveProjectService';

import CreateProjectQuestion from '@modules/projects/services/CreateProjectQuestion';

import { container } from 'tsyringe';

class ProjectsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const showProjects = container.resolve(IndexProjectService);
    const projects = await showProjects.execute();

    return response.json(projects);
  }

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

    return response.json(project);
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const removeProject = container.resolve(RemoveProjectService);

    await removeProject.execute(id);

    return response.status(204).json({});
  }

  // Questões

  public async createQuestion(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { projectId } = request.params;
    const { answer, question } = request.body;

    const createQuestion = container.resolve(CreateProjectQuestion);

    const result = await createQuestion.execute({
      project_id: projectId,
      question,
      answer,
    });

    return response.json(result);
  }

  public async removeQuestion(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const removeProject = container.resolve(RemoveProjectService);

    await removeProject.execute(id);

    return response.status(204).json({});
  }
}

export default ProjectsController;
