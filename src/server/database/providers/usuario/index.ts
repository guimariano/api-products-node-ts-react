import * as create from '@server/database/providers/usuario/create';
import * as getAll from '@server/database/providers/usuario/getAll';
import * as deleteById from '@server/database/providers/usuario/deleteById';
import * as getById from '@server/database/providers/usuario/getById';
import * as updateById from '@server/database/providers/usuario/updateById';
import * as count from '@server/database/providers/usuario/count';


export const UsuarioProvider = {
  ...create,
  ...getAll,
  ...deleteById,
  ...updateById,
  ...getById,
  ...count
};
