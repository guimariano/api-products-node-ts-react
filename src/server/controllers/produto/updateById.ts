import * as yup from 'yup';
import { Response, Request } from 'express';
import { validation } from '@server/shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { ProdutosProvider } from '@server/database/providers/produto';

interface IParamsProps {
  produtoId?: number;
}

interface IProduto {
  nome: string;
  categoria: string;
  preco: number;
}

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    produtoId: yup.number().integer().required().moreThan(0),
  })),
  body: getSchema<IProduto>(yup.object().shape({
    nome: yup.string().required().min(3).max(255),
    categoria: yup.string().required().min(3).max(255),
    preco: yup.number().required(),
  })),
}));

export const updateById = async (req: Request<IParamsProps, {}, IProduto>, res: Response) => {
  if (!req.params.produtoId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'parametro "produtoId" precisa ser definido.'
      }
    });
  }

  const result = await ProdutosProvider.updateById(req.params.produtoId, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      errors: {
        default: result.message
      }
    });
  }
  return res.status(StatusCodes.NO_CONTENT).json(result);
};
