import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import Project from '@modules/projects/infra/typeorm/entities/Project';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';

import LibraryItem from '@modules/library/infra/typeorm/entities/LibraryItem';
import ILibraryRepository from '@modules/library/repositories/ILibraryRepository';

import { inject, injectable } from 'tsyringe';

type Response = {
  users: User[];
  projects: Project[];
  library: LibraryItem[];
};

@injectable()
class ShowProjectService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('LibraryRepository')
    private libraryRepository: ILibraryRepository
  ) {}

  public async execute(term: string): Promise<Response> {
    const users = await this.usersRepository.search(term);
    // const projects = await this.projectsRepository.search(term);
    // const library = await this.libraryRepository.search(term);

    return { users, projects: [], library: [] };
  }
}

export default ShowProjectService;
