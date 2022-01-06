/* eslint-disable @typescript-eslint/no-explicit-any */
import sqlSentence from '../sqlSentence';

export * from './POST';
export * from './GET';
export * from './PUT';
export * from './DELETE';

/**
 * @description Ejecuta una sentencia SQL perzonalizada
 * @param sql Sentencia SQL a ejecutar
 * @param params Parametros de la sentencia
 * @returns Promise<unknow>
 */
export const customSQL = (
    sql: string,
    params: any[] = []
): Promise<unknown> => {
    return sqlSentence(sql, params);
};
