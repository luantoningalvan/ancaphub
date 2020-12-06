import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/passwords.routes';
import relationshipsRouter from '@modules/users/infra/http/routes/relationships.routes';

import postsRouter from '@modules/posts/infra/http/routes/posts.routes';
import postLikes from '@modules/posts/infra/http/routes/postLikes.routes';
import timelineRouter from '@modules/posts/infra/http/routes/timeline.routes';
import commentsRouter from '@modules/posts/infra/http/routes/comments.routes';

import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';

import libraryRouter from '@modules/library/infra/http/routes/library.routes';
import authorsRouter from '@modules/library/infra/http/routes/authors.routes';

import projectsRouter from '@modules/projects/infra/http/routes/projects.routes';
import projectPosts from '@modules/projects/infra/http/routes/projectPosts.routes';
import projectQuestion from '@modules/projects/infra/http/routes/projectQuestion.routes';

import profilesRouter from '@modules/profiles/infra/http/routes/profiles.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/relationships', relationshipsRouter);

routes.use('/posts', postsRouter);
routes.use('/posts', postLikes);
routes.use('/posts', commentsRouter);
routes.use('/timeline', timelineRouter);

routes.use('/categories', categoriesRouter);

routes.use('/library', libraryRouter);
routes.use('/authors', authorsRouter);

routes.use('/projects', projectsRouter);
routes.use('/projects', projectPosts);
routes.use('/projects', projectQuestion);

routes.use('/profiles', profilesRouter);

export default routes;
