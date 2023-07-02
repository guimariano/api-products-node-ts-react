import * as yup from 'yup';
import { Response, Request } from 'express';
import { validation } from '@server/shared/middlewares';
import { StatusCodes } from 'http-status-codes';

interface IParamsProps {
  rateId?: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    rateId: yup.number().integer().required().moreThan(0),
  })),
}));

export const getById = async (req: Request<IParamsProps>, res: Response) => {
  if (Number(req.params.rateId) === 99999) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Registro não encontrado'
      }
    });
  }
  return res.status(StatusCodes.OK).json({
    rateId: req.params.rateId,
    rate: 5,
    produtoId: 1,
    usuarioId: 1,
  });
};
