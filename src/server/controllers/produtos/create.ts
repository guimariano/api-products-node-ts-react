import * as yup from 'yup';
import { Response, Request } from 'express';
import { validation } from '@server/shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { IProduto } from '@server/database/models';

type IBodyProps = Omit<IProduto, 'produtoId'>;

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
    fabricante: yup.string().required(),
    preco: yup.number().required(),
    createdOn: yup.date().optional().default(() => new Date()),
  })),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) =>
  res.status(StatusCodes.CREATED).json(1);
