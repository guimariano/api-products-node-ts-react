import { ETableNames } from '@server/database/ETableNames';
import { Knex as knex } from '@server/database/knex';
import { IProduto } from '@server/database/models';

export const getById = async (produtoId: number): Promise<IProduto | Error> => {
  try {
    const resultById = await knex(ETableNames.produto)
      .select('*')
      .where('produtoId', '=', Number(produtoId))
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
