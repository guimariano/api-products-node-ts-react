import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Node.js is running!');
});

router.post('/teste', (req: Request, res: Response) => {
  console.log(req.body);
  res.status(StatusCodes.OK).json(req.body);
});

export {
  router,
};


