import * as yup from 'yup';
import { Response, Request } from 'express';
import { validation } from '@server/shared/middlewares';
import { StatusCodes } from 'http-status-codes';

interface IProduto {
  nome: string;
  fabricante: string;
  preco: number;
  createdOn?: Date;
}

interface IFilter {
  filter?: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IProduto>(yup.object().shape({
    nome: yup.string().required().min(3),
    fabricante: yup.string().required(),
    preco: yup.number().required(),
    createdOn: yup.date().optional().default(() => new Date()),
  })),
  query: getSchema<IFilter>(yup.object().shape({
    filter: yup.string().optional().min(3),
  })),
}));

export const create = async (req: Request<{}, {}, IProduto>, res: Response) => res.status(StatusCodes.OK).json(req.body);
