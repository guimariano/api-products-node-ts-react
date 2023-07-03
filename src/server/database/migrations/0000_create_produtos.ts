import 'tsconfig-paths/register';
import { Knex } from 'knex';
import { ETableNames } from '@server/database/ETableNames';

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.produto, (table) => {
      table.bigIncrements('produtoId').primary().index();
      table.string('nome', 255).checkLength('<=', 255).index().notNullable();
      table.string('fabricante', 255).checkLength('<=', 255).index().notNullable();
      table.decimal('preco', 10, 2).index().notNullable();
      table.timestamps(true, true, true);

      table.comment('Table used to store products');
    })
    .then(() => console.log(`# Created table ${ETableNames.produto}`));
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(ETableNames.produto)
    .then(() => console.log(`# Dropped table ${ETableNames.produto}`));
}

