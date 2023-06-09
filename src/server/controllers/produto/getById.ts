import * as yup from 'yup';
import { Response, Request } from 'express';
import { validation } from '@server/shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { ProdutosProvider } from '@server/database/providers/produto';

interface IParamsProps {
  produtoId?: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    produtoId: yup.number().integer().required().moreThan(0),
  })),
}));

export const getById = async (req: Request<IParamsProps>, res: Response) => {
  if (!req.params.produtoId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'parametro "produtoId" precisa ser definido.'
      }
    });
  }

  const result = await ProdutosProvider.getById(req.params.produtoId);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      errors: {
        default: result.message
      }
    });
  }
  return res.status(StatusCodes.OK).json(result);
};
