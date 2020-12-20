import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import usersSettingsRouter from '@modules/users/infra/http/routes/usersSettings.routes';
import usersLocationRouter from '@modules/users/infra/http/routes/usersLocation.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/passwords.routes';
import relationshipsRouter from '@modules/users/infra/http/routes/relationships.routes';

import postsRouter from '@modules/posts/infra/http/routes/posts.routes';
import postLikesRouter from '@modules/posts/infra/http/routes/postLikes.routes';
import timelineRouter from '@modules/posts/infra/http/routes/timeline.routes';
import commentsRouter from '@modules/posts/infra/http/routes/comments.routes';

import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';

import libraryRouter from '@modules/library/infra/http/routes/library.routes';
import authorsRouter from '@modules/library/infra/http/routes/authors.routes';

import projectsRouter from '@modules/projects/infra/http/routes/projects.routes';
import projectPostsRouter from '@modules/projects/infra/http/routes/projectPosts.routes';

import searchRouter from '@modules/search/infra/http/routes/search.routes';
import notificationsRouter from '@modules/notifications/infra/http/routes/notifications.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/relationships', relationshipsRouter);
routes.use('/settings', usersSettingsRouter);
routes.use('/location', usersLocationRouter);

routes.use('/search', searchRouter);

routes.use('/posts', postsRouter);
routes.use('/posts', postLikesRouter);
routes.use('/posts', commentsRouter);
routes.use('/timeline', timelineRouter);

routes.use('/categories', categoriesRouter);

routes.use('/library', libraryRouter);
routes.use('/authors', authorsRouter);

routes.use('/projects', projectsRouter);
routes.use('/projects', projectPostsRouter);

routes.use('/notifications', notificationsRouter);

export default routes;
