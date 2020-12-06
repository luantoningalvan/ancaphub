import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IRelationshipsRepository from '@modules/users/repositories/IRelationshipsRepository';
import RelationshipsRepository from '@modules/users/infra/typeorm/repositories/RelationshipsRepository';

import IPostRepository from '@modules/posts/repositories/IPostRepository';
import PostRepository from '@modules/posts/infra/typeorm/repositories/PostRepository';

import IPostLikesRepository from '@modules/posts/repositories/IPostLikesRepository';
import PostLikesRepository from '@modules/posts/infra/typeorm/repositories/PostLikesRepository';

import IPostCommentsRepository from '@modules/posts/repositories/IPostCommentsRepository';
import PostCommentsRepository from '@modules/posts/infra/typeorm/repositories/PostCommentsRepository';

import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';

import ILibraryRepository from '@modules/library/repositories/ILibraryRepository';
import LibraryRepository from '@modules/library/infra/typeorm/repositories/LibraryRepository';

import IAuthorsRepository from '@modules/library/repositories/IAuthorsRepository';
import AuthorsRepository from '@modules/library/infra/typeorm/repositories/AuthorsRepository';

import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import ProjectsRepository from '@modules/projects/infra/typeorm/repositories/ProjectsRepository';

import IProjectPostsRepository from '@modules/projects/repositories/IProjectPostsRepository';
import ProjectPostsRepository from '@modules/projects/infra/typeorm/repositories/ProjectPostsRepository';
import IProfilesRepository from '@modules/profiles/repositories/IProfilesRepository';
import ProfilesRepository from '@modules/profiles/infra/typeorm/repositories/ProfilesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
);

container.registerSingleton<IPostLikesRepository>(
  'PostLikesRepository',
  PostLikesRepository
);

container.registerSingleton<IPostCommentsRepository>(
  'PostCommentsRepository',
  PostCommentsRepository
);

container.registerSingleton<IRelationshipsRepository>(
  'RelationshipsRepository',
  RelationshipsRepository
);

container.registerSingleton<ICategoryRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<ILibraryRepository>(
  'LibraryRepository',
  LibraryRepository
);

container.registerSingleton<IAuthorsRepository>(
  'AuthorsRepository',
  AuthorsRepository
);

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository
);

container.registerSingleton<IProjectPostsRepository>(
  'ProjectPostsRepository',
  ProjectPostsRepository
);

container.registerSingleton<IPostRepository>('PostsRepository', PostRepository);

container.registerSingleton<IProfilesRepository>(
  'ProfilesRepository',
  ProfilesRepository
);
