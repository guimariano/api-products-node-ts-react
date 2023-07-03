import { ETableNames } from '@server/database/ETableNames';
import { Knex as knex } from '@server/database/knex';

export const deleteById = async (produtoId: number): Promise<void | Error> => {
  try {
    const result = await knex(ETableNames.produto)
      .where('produtoId', '=', Number(produtoId))
      .del();

    if (result > 0) {
      return undefined;
    }

    return new Error('erro ao deletar registro');
  } catch (error) {
    console.log(error);
    return Error('erro ao deletar registro');
  }
};
