import * as yup from 'yup';
import { Response, Request } from 'express';
import { validation } from '@server/shared/middlewares';
import { StatusCodes } from 'http-status-codes';

interface IQueryProps {
  filter?: string;
  page?: number;
  limit?: number;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    filter: yup.string().optional(),
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
  })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', 1);

  return res.status(StatusCodes.OK).json([ {
    id: 1,
    nome: 'Produto 1',
    fabricante: 'Fabricante 1',
    preco: 5000.00,
    createdOn: new Date(),
  } ]);
};
