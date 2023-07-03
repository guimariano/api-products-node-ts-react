import * as create from '@server/database/providers/produtos/create';
import * as getAll from '@server/database/providers/produtos/getAll';
import * as deleteById from '@server/database/providers/produtos/deleteById';
import * as getById from '@server/database/providers/produtos/getById';
import * as updateById from '@server/database/providers/produtos/updateById';
import * as count from '@server/database/providers/produtos/count';


export const ProdutosProvider = {
  ...create,
  ...getAll,
  ...deleteById,
  ...updateById,
  ...getById,
  ...count
};
