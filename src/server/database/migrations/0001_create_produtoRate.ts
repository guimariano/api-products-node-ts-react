import 'tsconfig-paths/register';
import { Knex } from 'knex';
import { ETableNames } from '@server/database/ETableNames';

export async function up(knex: Knex): Promise<void> {
  return knex
    .schema
    .createTable(ETableNames.produtoRate, (table) => {
      table.bigIncrements('rateId').primary().index();
      table.tinyint('rate').index().notNullable().defaultTo(0);

      table.bigInteger('produtoId')
        .unsigned()
        .index()
        .references('produtoId')
        .inTable(ETableNames.produto);

      table.comment('Table used to store products');
    })
    .then(() => console.log(`# Created table ${ETableNames.produtoRate}`));
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(ETableNames.produtoRate)
    .then(() => console.log(`# Dropped table ${ETableNames.produtoRate}`));
}

