import * as yup from 'yup';
import { Response, Request } from 'express';
import { validation } from '@server/shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { IRating } from '@server/database/models';
import { RatingProvider } from '@server/database/providers/rating';

interface IParamsProps {
  ratingId?: number;
}

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    ratingId: yup.number().integer().required().moreThan(0),
  })),
  body: getSchema<Omit<IRating, 'ratingId'>>(yup.object().shape({
    rating: yup.number().required().min(0).max(5),
    produtoId: yup.number().required().moreThan(0),
    usuarioId: yup.number().required().moreThan(0),
  })),
}));

export const updateById = async (req: Request<IParamsProps, {}, IRating>, res: Response) => {
  if (!req.params.ratingId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'parametro "ratingId" precisa ser definido.'
      }
    });
  }

  const result = await RatingProvider.updateById(req.params.ratingId, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      errors: {
        default: result.message
      }
    });
  }
  return res.status(StatusCodes.NO_CONTENT).json(result);
};
