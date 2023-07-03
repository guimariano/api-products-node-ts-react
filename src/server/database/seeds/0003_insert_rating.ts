import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';
import { IRating } from '../models';
import { rand, randNumber } from '@ngneat/falso';

type ISeedRating = Omit<IRating, 'ratingId'>;

export const seed = async (knex: Knex) => {
  const [ { count } ] = await knex(ETableNames.rating).count<[ { count: number } ]>('* as count');
  if (!Number.isInteger(count) || Number(count) > 0) {
    return;
  }

  const produtos = await knex(ETableNames.produto).select('produtoId').limit(300);
  const usuarios = await knex(ETableNames.usuario).select('usuarioId');

  const ratingsAInserir: ISeedRating[] = produtos.map((produto) => ({
    rating: rand([ 0, 1, 2, 3, 4, 5 ]),
    produtoId: produto.produtoId,
    usuarioId: usuarios[randNumber({ min: 0, max: usuarios.length - 1 })].usuarioId,
  }));

  await knex(ETableNames.rating).insert(ratingsAInserir);
};
