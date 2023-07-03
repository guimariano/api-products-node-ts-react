import { ETableNames } from '@server/database/ETableNames';
import { Knex as knex } from '@server/database/knex';
import { IRating } from '@server/database/models';
import { getById as getProdutoById } from '../produto/getById';
import { getById as getUsuarioById } from '../usuario/getById';

export const updateById = async (
  ratingId: number,
  rating: Omit<IRating, 'ratingId'>
): Promise<void | Error> => {
  try {
    const { produtoId, usuarioId } = rating;

    const produto = await getProdutoById(produtoId);

    if (produto instanceof Error) {
      return new Error('produto não encontrado');
    }

    const usuario = await getUsuarioById(usuarioId);

    if (usuario instanceof Error) {
      return new Error('usuário não encontrado');
    }

    const result = await knex(ETableNames.rating)
      .update(rating)
      .where('ratingId', '=', Number(ratingId));

    if (result > 0) {
      return undefined;
    }

    return Error('registro não encontrado para ser atualizado');
  } catch (error) {
    console.log(error);
    return Error('erro ao atualizar registro!');
  }
};
