import 'tsconfig-paths/register';
import { Knex } from 'knex';
import { ETableNames } from '@server/database/ETableNames';

export async function up(knex: Knex): Promise<void> {
  return knex
    .schema
    .createTable(ETableNames.rating, (table) => {
      table.bigIncrements('rateId').primary().index();
      table.tinyint('rating').index().notNullable().defaultTo(0);

      table.bigInteger('produtoId')
        .unsigned()
        .index()
        .references('produtoId')
        .inTable(ETableNames.produto)
        .defaultTo(1);

      // table.bigInteger('usuarioId')
      //   .unsigned()
      //   .index()
      //   .references('usuarioId')
      //   .inTable(ETableNames.usuario);

      table.comment('Table used to store rating products');
    })
    .then(() => console.log(`# Created table ${ETableNames.rating}`));
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(ETableNames.rating)
    .then(() => console.log(`# Dropped table ${ETableNames.rating}`));
}

