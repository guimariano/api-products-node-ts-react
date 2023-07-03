import { ETableNames } from '@server/database/ETableNames';
import { Knex as knex } from '@server/database/knex';
import { IProduto } from '@server/database/models';

export const updateById = async (
  produtoId: number,
  produto: Omit<IProduto, 'produtoId'>
): Promise<void | Error> => {
  try {
    const result = await knex(ETableNames.produto)
      .update(produto)
      .where('produtoId', '=', Number(produtoId));

    if (result > 0) {
      return undefined;
    }

    return Error('erro ao atualizar registro');
  } catch (error) {
    console.log(error);
    return Error('erro ao atualizar registro');
  }
};
