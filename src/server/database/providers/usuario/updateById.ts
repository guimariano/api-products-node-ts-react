import { ETableNames } from '@server/database/ETableNames';
import { Knex as knex } from '@server/database/knex';
import { IUsuario } from '@server/database/models';

export const updateById = async (
  usuarioId: number,
  usuario: Omit<IUsuario, 'usuarioId'>
): Promise<void | Error> => {
  try {
    const result = await knex(ETableNames.usuario)
      .update(usuario)
      .where('usuarioId', '=', Number(usuarioId));

    if (result > 0) {
      return undefined;
    }

    return Error('erro ao atualizar registro');
  } catch (error) {
    console.log(error);
    return Error('erro ao atualizar registro');
  }
};
