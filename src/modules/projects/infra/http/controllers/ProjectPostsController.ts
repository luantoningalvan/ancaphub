import { Request, Response } from 'express';

import IndexProjectPostsService from '@modules/projects/services/IndexProjectPostsService';
import ShowProjectPostService from '@modules/projects/services/ShowProjectPostService';
import CreateProjectPostService from '@modules/projects/services/CreateProjectPostService';
import UpdateProjectPostService from '@modules/projects/services/UpdateProjectPostService';
import RemoveProjectPostService from '@modules/projects/services/RemoveProjectPostService';

import { container } from 'tsyringe';

class ProjectPostsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { projectId } = request.params;

    const indexPosts = container.resolve(IndexProjectPostsService);
    const posts = await indexPosts.execute(projectId);

    return response.json(posts);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showPost = container.resolve(ShowProjectPostService);
    const post = await showPost.execute(id);

    return response.json(post);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id: author_id } = request.user;
    const { projectId: project_id } = request.params;

    const { title, content, thumbnail } = request.body;

    const createPost = container.resolve(CreateProjectPostService);

    const post = await createPost.execute({
      author_id,
      project_id,
      title,
      content,
      thumbnail,
    });

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

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const removePost = container.resolve(RemoveProjectPostService);

    await removePost.execute(id);

    return response.status(204).json({});
  }
}

export default ProjectPostsController;
