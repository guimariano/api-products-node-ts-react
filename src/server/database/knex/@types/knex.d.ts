import { IProduto } from '@server/database/models';

declare module 'knex/types/tables' {
  interface Tables {
    produto: IProduto
  }
}
