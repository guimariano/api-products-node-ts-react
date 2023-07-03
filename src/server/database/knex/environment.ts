import { Knex } from 'knex';
import path from 'path';

export const development: Knex.Config = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__dirname, '..', '..', '..', '..', 'database.sqlite'),
  },
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'seeds'),
  },
  pool: {
    afterCreate: (connection: any, done: Function) => {
      connection.run('PRAGMA foreign_keys = ON');
      done();
    }
  }
};

/** Oa ambiente de test do Jest é criado e destruido em memória.
 * Para isso, devemos subir as migrations guide nesse ambiente
 * e, após os testes, destuir o Knex
*/
export const test: Knex.Config = {
  ...development,
  connection: ':memory:',
};

export const production: Knex.Config = {
  ...development,
};
