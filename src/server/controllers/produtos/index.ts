import * as create from '@server/controllers/produtos/create';
import * as getAll from '@server/controllers/produtos/getAll';
import * as deleteById from '@server/controllers/produtos/deleteById';
import * as getById from '@server/controllers/produtos/getById';
import * as updateById from '@server/controllers/produtos/updateById';


export const ProdutosController = {
  ...create,
  ...getAll,
  ...deleteById,
  ...updateById,
  ...getById,
};
