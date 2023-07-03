import 'tsconfig-paths/register';
import { Knex } from 'knex';
import { ETableNames } from '@server/database/ETableNames';

export async function up(knex: Knex): Promise<void> {
  return knex
    .schema
    .createTable(ETableNames.rating, (table) => {
      table.bigIncrements('ratingId').unsigned().primary().index();
      table.tinyint('rating').index().notNullable().defaultTo(0);

      table.bigInteger('produtoId')
        .unsigned()
        .index()
        .notNullable()
        .references('produtoId')
        .inTable(ETableNames.produto)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.bigInteger('usuarioId')
        .unsigned()
        .index()
        .notNullable()
        .references('usuarioId')
        .inTable(ETableNames.usuario)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.timestamps(true, true, true);

      table.comment('Table used to store user rating products');
    })
    .then(() => console.log(`# Created table ${ETableNames.rating}`));
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(ETableNames.rating)
    .then(() => console.log(`# Dropped table ${ETableNames.rating}`));
}

