import * as create from '@server/controllers/usuario/create';
import * as getAll from '@server/controllers/usuario/getAll';
import * as deleteById from '@server/controllers/usuario/deleteById';
import * as getById from '@server/controllers/usuario/getById';
import * as updateById from '@server/controllers/usuario/updateById';


export const UsuarioController = {
  ...create,
  ...getAll,
  ...deleteById,
  ...updateById,
  ...getById,
};
