import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port: string | undefined = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express and Node.js Server is running!');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});