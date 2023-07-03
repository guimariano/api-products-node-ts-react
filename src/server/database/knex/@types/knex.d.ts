import { IProduto, IRating, IUsuario } from '@server/database/models';

declare module 'knex/types/tables' {
  interface Tables {
    produto: IProduto,
    usuario: IUsuario,
    rating: IRating,

  }
}
