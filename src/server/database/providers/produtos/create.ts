import { ETableNames } from '@server/database/ETableNames';
import { Knex as knex } from '@server/database/knex';
import { IProduto } from '@server/database/models';

export const create = async (produto: Omit<IProduto, 'produtoId'>): Promise<number | Error> => {
  try {
    const [ result ] = await knex(ETableNames.produto).insert([ produto ]).returning('produtoId');

    /** ! return object se for vindo do postgres */
    /** ! return produtoId diretamente se for feito via sqlite */
    if (typeof result === 'object') {
      return result.produtoId;
    } else if (typeof result === 'number') {
      return result;
    }
    return new Error('erro ao inserir registro');
  } catch (error) {
    console.log(error);
    return Error('erro ao inserir registro');
  }
};
