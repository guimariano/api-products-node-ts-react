import { ETableNames } from '@server/database/ETableNames';
import { Knex as knex } from '@server/database/knex';
import { IProduto } from '@server/database/models';

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
  produtoId = 0,
): Promise<IProduto[] | Error> => {
  try {
    const result = await knex(ETableNames.produto)
      .select('*')
      .where('produtoId', '=', Number(produtoId))
      .orWhere('nome', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (produtoId > 0 && result.every((item) => item.produtoId !== produtoId)) {
      const resultById = await knex(ETableNames.produto)
        .select('*')
        .where('produtoId', '=', produtoId)
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
