import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';
import { IProduto } from '../models';
import { randProduct } from '@ngneat/falso';

type ISeedProduto = Omit<IProduto, 'produtoId'>;

export const seed = async (knex: Knex) => {
  const [ { count } ] = await knex(ETableNames.produto).count<[ { count: number } ]>('* as count');

  if (!Number.isInteger(count) || Number(count) > 0) {
    return;
  }
  const produtosAInserir: ISeedProduto[] = randProduct({ length: 500 }).map((produto) => ({
    nome: produto.title,
    categoria: produto.category,
    preco: Number(produto.price)
  }));

  await knex(ETableNames.produto).insert(produtosAInserir);
};
