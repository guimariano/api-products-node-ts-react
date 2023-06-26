import * as yup from 'yup';
import { Response, Request } from 'express';
import { validation } from '@server/shared/middlewares';
import { StatusCodes } from 'http-status-codes';

interface IParamsProps {
  id?: number;
}

interface IProduto {
  nome?: string;
  fabricante?: string;
  preco?: number;
  updatedOn?: Date;
}

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
  body: getSchema<IProduto>(yup.object().shape({
    nome: yup.string().optional().min(3),
    fabricante: yup.string().optional().min(3),
    preco: yup.number().optional(),
    updatedOn: yup.date().optional().default(() => new Date()),
  })),
}));

export const updateById = async (req: Request<IParamsProps, {}, IProduto>, res: Response) => {
  if (Number(req.params.id) === 99999) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Registro não encontrado'
      }
    });
  }
  return res.status(StatusCodes.NO_CONTENT).send();
};
