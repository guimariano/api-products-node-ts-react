import { ETableNames } from '@server/database/ETableNames';
import { Knex as knex } from '@server/database/knex';
import { IRating } from '@server/database/models';

export const updateById = async (
  ratingId: number,
  produto: Omit<IRating, 'ratingId'>
): Promise<void | Error> => {
  try {
    const result = await knex(ETableNames.produto)
      .update(produto)
      .where('ratingId', '=', Number(ratingId));

    if (result > 0) {
      return undefined;
    }

    return Error('erro ao atualizar registro');
  } catch (error) {
    console.log(error);
    return Error('erro ao atualizar registro');
  }
};
