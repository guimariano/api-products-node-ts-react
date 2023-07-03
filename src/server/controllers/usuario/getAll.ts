import * as yup from 'yup';
import { Response, Request } from 'express';
import { validation } from '@server/shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { UsuarioProvider } from '@server/database/providers/usuario';

interface IQueryProps {
  usuarioId?: number;
  filter?: string;
  page?: number;
  limit?: number;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    usuarioId: yup.number().optional().default(0),
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    filter: yup.string().optional(),
  })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  const result = await UsuarioProvider.getAll(
    req.query.page || 1,
    req.query.limit || 7,
    req.query.filter || '',
    Number(req.query.usuarioId)
  );
  const count = await UsuarioProvider.count(req.query.filter);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      errors: {
        default: result.message
      }
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      errors: {
        default: count.message
      }
    });
  }

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', count);

  return res.status(StatusCodes.OK).json(result);
};
