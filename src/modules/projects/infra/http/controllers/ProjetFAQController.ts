import { Request, Response } from 'express';

import RemoveProjectQuestion from '@modules/projects/services/RemoveProjectQuestion';
import CreateProjectQuestion from '@modules/projects/services/CreateProjectQuestion';

import { container } from 'tsyringe';

class ProjectsController {
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
    const { projectId } = request.params;

    const { id } = request.params;
    const removeProject = container.resolve(RemoveProjectQuestion);

    await removeProject.execute({ project_id: projectId, id });

    return response.status(204).json({});
  }
}

export default ProjectsController;
