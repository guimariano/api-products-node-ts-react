import express, { Express } from 'express';
import dotenv from 'dotenv';
import { router } from '@server/routes';
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();

app.use(bodyParser.json());
app.use(router);

export {
  app,
};
