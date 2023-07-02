import * as yup from 'yup';
import { Response, Request } from 'express';
import { validation } from '@server/shared/middlewares';
import { StatusCodes } from 'http-status-codes';

interface IParamsProps {
  produtoId?: number;
}

interface IProduto {
  nome: string;
  fabricante: string;
  preco: number;
}

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    produtoId: yup.number().integer().required().moreThan(0),
  })),
  body: getSchema<IProduto>(yup.object().shape({
    nome: yup.string().required().min(3).max(255),
    fabricante: yup.string().required().min(3).max(255),
    preco: yup.number().required(),
  })),
}));

export const updateById = async (req: Request<IParamsProps, {}, IProduto>, res: Response) => {
  if (Number(req.params.produtoId) === 99999) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Registro não encontrado'
      }
    });
  }
  return res.status(StatusCodes.NO_CONTENT).send();
};
