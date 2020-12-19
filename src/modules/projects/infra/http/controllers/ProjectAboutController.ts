import { Request, Response } from 'express';

import ShowProjectPostService from '@modules/projects/services/ShowProjectPostService';
import UpdateProjectPostService from '@modules/projects/services/UpdateProjectPostService';

import { container } from 'tsyringe';

class ProjectPostsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showPost = container.resolve(ShowProjectPostService);
    const post = await showPost.execute(id);

    return response.json(post);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, thumbnail, content } = request.body;

    const updatePost = container.resolve(UpdateProjectPostService);

    const post = await updatePost.execute({
      id,
      title,
      thumbnail,
      content,
    });

    return response.json(post);
  }
}

export default ProjectPostsController;
