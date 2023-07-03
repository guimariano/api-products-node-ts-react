import { ETableNames } from '@server/database/ETableNames';
import { Knex as knex } from '@server/database/knex';
import { IRating } from '@server/database/models';
import { getById as getProdutoById } from '../produto/getById';
import { getById as getUsuarioById } from '../usuario/getById';

export const create = async (rating: Omit<IRating, 'ratingId'>): Promise<number | Error> => {
  try {
    const { produtoId, usuarioId } = rating;

    const produto = await getProdutoById(produtoId);

    if (produto instanceof Error) {
      return new Error(produto.message);
    }

    const usuario = await getUsuarioById(usuarioId);

    if (usuario instanceof Error) {
      return new Error(usuario.message);
    }

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
