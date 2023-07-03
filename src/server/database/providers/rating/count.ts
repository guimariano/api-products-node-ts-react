import { ETableNames } from '@server/database/ETableNames';
import { Knex as knex } from '@server/database/knex';

export const count = async (filter = ''): Promise<number | Error> => {
  try {
    const [ { count } ] = await knex(ETableNames.produto)
      .where('produtoId', 'like', `%${filter}%`)
      .count<[ { count: number }]>('* as count');

    if (Number.isInteger(Number(count))) {
      return Number(count);
    }

    return new Error('Erro ao consultar a quantidade total de registros');
  } catch (error) {
    console.log(error);
    return Error('erro ao consultar a quantidade total de registros');
  }
};
