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

export const createValidation = validation((getSchema) => ({
  body: getSchema<IProduto>(yup.object().shape({
    nome: yup.string().required().min(3),
    fabricante: yup.string().required(),
    preco: yup.number().required(),
    createdOn: yup.date().optional().default(() => new Date()),
  })),
}));

export const create = async (req: Request<{}, {}, IProduto>, res: Response) => {
  console.log(req.body);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Não implementado!');
};
