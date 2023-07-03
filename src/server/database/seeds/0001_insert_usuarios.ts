import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';
import { IUsuario } from '../models';
import { randUser } from '@ngneat/falso';

type ISeedUsuario = Omit<IUsuario, 'usuarioId'>;

export const seed = async (knex: Knex) => {
  const [ { count } ] = await knex(ETableNames.usuario).count<[ { count: number } ]>('* as count');

  if (!Number.isInteger(count) || Number(count) > 0) {
    return;
  }

  const usuariosAInserir: ISeedUsuario[] = randUser({ length: 100 }).map((usuario) => ({
    nome: `${usuario.firstName} ${usuario.lastName}`,
    email: usuario.email,
  }));

  await knex(ETableNames.usuario).insert(usuariosAInserir);
};
