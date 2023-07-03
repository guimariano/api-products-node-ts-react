import * as create from '@server/controllers/produto/create';
import * as getAll from '@server/controllers/produto/getAll';
import * as deleteById from '@server/controllers/produto/deleteById';
import * as getById from '@server/controllers/produto/getById';
import * as updateById from '@server/controllers/produto/updateById';


export const ProdutosController = {
  ...create,
  ...getAll,
  ...deleteById,
  ...updateById,
  ...getById,
};
