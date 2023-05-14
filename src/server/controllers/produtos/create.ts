import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface IProduto {
  nome: string;
  fabricante: string;
  preco: number;
  createdOn?: Date;
}

const produtoSchema: yup.ObjectSchema<IProduto> = yup.object().shape({
  nome: yup.string().required().min(3),
  fabricante: yup.string().required(),
  preco: yup.number().required(),
  createdOn: yup.date().optional().default(() => new Date()),
});

export const create = async (req: Request<{}, {}, IProduto>, res: Response) => {
  let validatedData: IProduto | undefined = undefined;

  try {
    validatedData = await produtoSchema.validate(req.body, { abortEarly: false });
  } catch (error) {
    const yupError = error as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach((err) => {
      if (err.path === undefined) {
        return;
      }

      errors[err.path] = err.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: errors
    });
  }
  console.log(validatedData);
  return res.status(StatusCodes.OK).json(validatedData);
};
