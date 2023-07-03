import { ETableNames } from '@server/database/ETableNames';
import { Knex as knex } from '@server/database/knex';
import { IRating } from '@server/database/models';

export const create = async (rating: Omit<IRating, 'ratingId'>): Promise<number | Error> => {
  try {
    const [ { count } ] = await knex(ETableNames.rating)
      .select('ratingId')
      .where('usuarioId', '=', rating.usuarioId)
      .andWhere('produtoId', '=', rating.produtoId).count<[{ count: number }]>('ratingId as count');

    if (count > 0) {
      return new Error('registro duplicado');
    }

    const [ result ] = await knex(ETableNames.rating).insert([ rating ]).returning('ratingId');

    /** ! return object se for vindo do postgres */
    /** ! return ratingId diretamente se for feito via sqlite */
    if (typeof result === 'object') {
      return result.ratingId;
    } else if (typeof result === 'number') {
      return result;
    }
    return new Error('erro ao inserir registro');
  } catch (error) {
    console.log(error);
    return Error('erro ao inserir registro');
  }
};
