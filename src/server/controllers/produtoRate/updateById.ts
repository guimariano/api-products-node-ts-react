import * as yup from 'yup';
import { Response, Request } from 'express';
import { validation } from '@server/shared/middlewares';
import { StatusCodes } from 'http-status-codes';

interface IParamsProps {
  rateId?: number;
}

interface IProdutoRate {
  rate?: number;
  produtoId?: number;
  usuarioId?: number;
}

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    rateId: yup.number().integer().required().moreThan(0),
  })),
  body: getSchema<IProdutoRate>(yup.object().shape({
    rate: yup.number().min(3),
    usuarioId: yup.number(),
    produtoId: yup.number()
  })),
}));

export const updateById = async (req: Request<IParamsProps, {}, IProdutoRate>, res: Response) => {
  if (Number(req.params.rateId) === 99999) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Registro não encontrado'
      }
    });
  }
  return res.status(StatusCodes.NO_CONTENT).send();
};
