import * as yup from 'yup';
import { Response, Request } from 'express';
import { validation } from '@server/shared/middlewares';
import { StatusCodes } from 'http-status-codes';

interface IUsuarioProdutoRate {
  rate: number;
  produtoId: number;
  usuarioId: number;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IUsuarioProdutoRate>(yup.object().shape({
    rate: yup.number().required(),
    produtoId: yup.number().required(),
    usuarioId: yup.number().required(),
  })),
}));

export const create = async (req: Request<{}, {}, IUsuarioProdutoRate>, res: Response) =>
  res.status(StatusCodes.CREATED).json(1);
