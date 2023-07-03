import { ETableNames } from '@server/database/ETableNames';
import { Knex as knex } from '@server/database/knex';
import { IRating } from '@server/database/models';

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
  ratingId = 0,
): Promise<IRating[] | Error> => {
  try {
    const result = await knex(ETableNames.rating)
      .select('*')
      .where('ratingId', '=', Number(ratingId))
      .orWhere('nome', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (ratingId > 0 && result.every((item) => item.ratingId !== ratingId)) {
      const resultById = await knex(ETableNames.rating)
        .select('*')
        .where('ratingId', '=', ratingId)
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
