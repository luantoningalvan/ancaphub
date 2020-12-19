import { Request, Response } from 'express';

import ShowProjectService from '@modules/projects/services/ShowProjectService';
import RemoveProjectService from '@modules/projects/services/RemoveProjectService';
import CreateProjectQuestion from '@modules/projects/services/CreateProjectQuestion';

import { container } from 'tsyringe';

class ProjectsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProject = container.resolve(ShowProjectService);
    const project = await showProject.execute(id);

    return response.json(project);
  }

  public async create(request: Request, response: Response): Promise<Response> {
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

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const removeProject = container.resolve(RemoveProjectService);

    await removeProject.execute(id);

    return response.status(204).json({});
  }
}

export default ProjectsController;
