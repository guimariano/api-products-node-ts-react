import 'tsconfig-paths/register';
import { Knex } from 'knex';
import { ETableNames } from '@server/database/ETableNames';

export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.usuario, (table) => {
      table.bigIncrements('usuarioId').primary().index();
      table.string('nome', 255).checkLength('<=', 255).index().notNullable();
      table.string('email', 255).unique().checkLength('<=', 255).index().notNullable();
      table.timestamps(true, true, true);

      table.comment('Table used to store products');
    })
    .then(() => console.log(`# Created table ${ETableNames.usuario}`));
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(ETableNames.usuario)
    .then(() => console.log(`# Dropped table ${ETableNames.usuario}`));
}

