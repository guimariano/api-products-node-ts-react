import supertest from 'supertest';
import { server } from '../src/server/server';
import { Knex as knex } from '../src/server/database/knex';

/** Oa ambiente de test do Jest é criado e destruido em memória.
 * Para isso, devemos subir as migrations guide nesse ambiente
 * e, após os testes, destuir o Knex
*/
// eslint-disable-next-line no-undef
beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
});

// eslint-disable-next-line no-undef
afterAll(async () => {
  await knex.destroy();
});

export const testServer = supertest(server);
