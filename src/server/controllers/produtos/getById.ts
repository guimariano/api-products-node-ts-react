import * as yup from 'yup';
import { Response, Request } from 'express';
import { validation } from '@server/shared/middlewares';
import { StatusCodes } from 'http-status-codes';

interface IParamsProps {
  produtoId?: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    produtoId: yup.number().integer().required().moreThan(0),
  })),
}));

export const getById = async (req: Request<IParamsProps>, res: Response) => {
  if (Number(req.params.produtoId) === 99999) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Registro não encontrado'
      }
    });
  }
  return res.status(StatusCodes.OK).json({
    produtoId: req.params.produtoId,
    nome: 'Produto 1',
    fabricante: 'Fabricante 1',
    preco: 5000.00,
    createdOn: new Date(),
  });
};
