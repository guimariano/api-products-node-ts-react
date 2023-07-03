import { ETableNames } from '@server/database/ETableNames';
import { Knex as knex } from '@server/database/knex';
import { IUsuario } from '@server/database/models';

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
  usuarioId = 0,
): Promise<IUsuario[] | Error> => {
  try {
    const result = await knex(ETableNames.usuario)
      .select('*')
      .where('usuarioId', '=', Number(usuarioId))
      .orWhere('nome', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (usuarioId > 0 && result.every((item) => item.usuarioId !== usuarioId)) {
      const resultById = await knex(ETableNames.usuario)
        .select('*')
        .where('usuarioId', '=', usuarioId)
        .first();

      if (resultById) {
        return [ ...result, resultById ];
      }
    }

    return result;
  } catch (error) {
    console.log(error);
    return Error('erro ao buscar todos os registros');
  }
};
