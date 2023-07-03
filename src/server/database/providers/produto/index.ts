import * as create from '@server/database/providers/produto/create';
import * as getAll from '@server/database/providers/produto/getAll';
import * as deleteById from '@server/database/providers/produto/deleteById';
import * as getById from '@server/database/providers/produto/getById';
import * as updateById from '@server/database/providers/produto/updateById';
import * as count from '@server/database/providers/produto/count';


export const ProdutosProvider = {
  ...create,
  ...getAll,
  ...deleteById,
  ...updateById,
  ...getById,
  ...count
};
