import * as yup from 'yup';
import { Response, Request } from 'express';
import { validation } from '@server/shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { RatingProvider } from '@server/database/providers/rating';

interface IParamsProps {
  ratingId?: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    ratingId: yup.number().integer().required().moreThan(0),
  })),
}));

export const deleteById = async (req: Request<IParamsProps>, res: Response) => {
  if (!req.params.ratingId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'parametro "ratingId" precisa ser definido.'
      }
    });
  }

  const result = await RatingProvider.deleteById(req.params.ratingId);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
};
