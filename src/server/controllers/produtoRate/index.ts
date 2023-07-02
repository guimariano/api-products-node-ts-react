import * as create from '@server/controllers/produtoRate/create';
import * as getAll from '@server/controllers/produtoRate/getAll';
import * as deleteById from '@server/controllers/produtoRate/deleteById';
import * as getById from '@server/controllers/produtoRate/getById';
import * as updateById from '@server/controllers/produtoRate/updateById';


export const ProdutoRateController = {
  ...create,
  ...getAll,
  ...deleteById,
  ...updateById,
  ...getById,
};
