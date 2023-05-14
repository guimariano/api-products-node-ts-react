import express, { Express } from 'express';
import dotenv from 'dotenv';
import '@server/shared/services/translationsYup';
import { router } from '@server/routes';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(router);

export {
  app,
};
