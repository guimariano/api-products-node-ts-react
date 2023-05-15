import express, { Express } from 'express';
import dotenv from 'dotenv';
import '@server/shared/services/translationsYup';
import { router } from '@server/routes';

dotenv.config();

const server: Express = express();

server.use(express.json());
server.use(router);

export { server };
