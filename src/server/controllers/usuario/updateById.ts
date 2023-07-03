import * as yup from 'yup';
import { Response, Request } from 'express';
import { validation } from '@server/shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { UsuarioProvider } from '@server/database/providers/usuario';

interface IParamsProps {
  usuarioId?: number;
}

interface IUsuario {
  nome: string;
  email: string;
}

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    usuarioId: yup.number().integer().required().moreThan(0),
  })),
  body: getSchema<IUsuario>(yup.object().shape({
    nome: yup.string().required().min(3).max(255),
    email: yup.string().required().min(3).max(255).email(),
  })),
}));

export const updateById = async (req: Request<IParamsProps, {}, IUsuario>, res: Response) => {
  if (!req.params.usuarioId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'parametro "usuarioId" precisa ser definido.'
      }
    });
  }

  const result = await UsuarioProvider.updateById(req.params.usuarioId, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      errors: {
        default: result.message
      }
    });
  }
  return res.status(StatusCodes.NO_CONTENT).json(result);
};
