import { ETableNames } from '@server/database/ETableNames';
import { Knex as knex } from '@server/database/knex';
import { IUsuario } from '@server/database/models';

export const getById = async (usuarioId: number): Promise<IUsuario | Error> => {
  try {
    const resultById = await knex(ETableNames.usuario)
      .select('*')
      .where('usuarioId', '=', Number(usuarioId))
      .first();

    if (resultById) {
      return resultById;
    }

    return Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return Error('erro ao buscar o registro');
  }
};
