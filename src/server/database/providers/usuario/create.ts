import { ETableNames } from '@server/database/ETableNames';
import { Knex as knex } from '@server/database/knex';
import { IUsuario } from '@server/database/models';

export const create = async (usuario: Omit<IUsuario, 'usuarioId'>): Promise<number | Error> => {
  try {
    const [ result ] = await knex(ETableNames.usuario)
      .insert([ usuario ])
      .returning('usuarioId');

    /** ! return object se for vindo do postgres */
    /** ! return usuarioId diretamente se for feito via sqlite */
    if (typeof result === 'object') {
      return result.usuarioId;
    } else if (typeof result === 'number') {
      return result;
    }
    return new Error('erro ao inserir registro');
  } catch (error) {
    console.log(error);
    return Error('erro ao inserir registro');
  }
};
