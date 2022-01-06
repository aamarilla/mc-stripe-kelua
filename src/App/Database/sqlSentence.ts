import { pool } from '.';

/**
 * @description Sentencia SQL que se va a ejecutar en la base de datos
 * @param sql Sentencia de SQL que se va a ejecutar
 * @param params Parametros de la sentencia. @default []
 */
export default async (sql: string, params: unknown[] = []): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    try {
      pool.query(sql, params, (err, result) => {
        if (err) {
          console.log('[Query error] ', err);
          reject(err);
        }
        resolve(result);
      });
    } catch (error) {
      console.error('[Sentence error]', error);
      reject(error);
    }
  });
};