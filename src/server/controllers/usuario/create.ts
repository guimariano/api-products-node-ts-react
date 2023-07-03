import * as yup from 'yup';
import { Response, Request } from 'express';
import { validation } from '@server/shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { IUsuario } from '@server/database/models/usuario';
import { UsuarioProvider } from '@server/database/providers/usuario';

type IBodyProps = Omit<IUsuario, 'usuarioId'>;

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3).max(255),
    email: yup.string().required().min(3).max(255).email(),
  })),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await UsuarioProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }
  return res.status(StatusCodes.CREATED).json(result);
};
