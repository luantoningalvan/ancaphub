import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import '@shared/infra/typeorm';
import '@shared/container';

import routes from '@shared/infra/http/routes';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(morgan('short'));

app.use(express.json());
app.use('/api', routes);
app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err.message);

  return res.status(500).json({ status: 'error', message: err.message });
});

app.listen(3333, () => {
  console.log('Servidor iniciado');
});
