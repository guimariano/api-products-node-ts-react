import { ETableNames } from '@server/database/ETableNames';
import { Knex as knex } from '@server/database/knex';
import { IRating } from '@server/database/models';

export const getById = async (ratingId: number): Promise<IRating | Error> => {
  try {
    const resultById = await knex(ETableNames.rating)
      .select('*')
      .where('ratingId', '=', Number(ratingId))
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
