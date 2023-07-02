import * as yup from 'yup';
import { Response, Request } from 'express';
import { validation } from '@server/shared/middlewares';
import { StatusCodes } from 'http-status-codes';

interface IParamsProps {
  produtoId?: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    produtoId: yup.number().integer().required().moreThan(0),
  })),
}));

export const deleteById = async (req: Request<IParamsProps>, res: Response) => {
  if (Number(req.params.produtoId) === 99999) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Registro não encontrado'
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
};
