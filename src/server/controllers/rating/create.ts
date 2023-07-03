import * as yup from 'yup';
import { Response, Request } from 'express';
import { validation } from '@server/shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { IRating } from '@server/database/models/rating';
import { RatingProvider } from '@server/database/providers/rating';

type IBodyProps = Omit<IRating, 'ratingId'>;

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    rating: yup.number().required().min(0).max(5),
    produtoId: yup.number().required().moreThan(0),
    usuarioId: yup.number().required().moreThan(0),
  })),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await RatingProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }
  return res.status(StatusCodes.CREATED).json(result);
};
