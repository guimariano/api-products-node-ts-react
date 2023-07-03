import * as yup from 'yup';
import { Response, Request } from 'express';
import { validation } from '@server/shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { IProduto } from '@server/database/models';
import { ProdutosProvider } from '@server/database/providers/produtos';

type IBodyProps = Omit<IProduto, 'produtoId'>;

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3).max(255),
    fabricante: yup.string().required().min(3).max(255),
    preco: yup.number().required().min(0),
  })),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await ProdutosProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }
  return res.status(StatusCodes.CREATED).json(result);
};
