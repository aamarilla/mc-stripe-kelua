import {IInsert} from '../interfaces/insert.interface';
import {IUpdateTable} from '../interfaces/updateTable.interface';
import sqlSentence from '../sqlSentence';

/**
 * @description Inserta un registro en la base de datos
 * @param table Tabla dónde se va a insertar el valor
 * @param dataIncoming Data que se va a insertar.
 * @returns Promise<IUpdateTable>
 */
export async function insertOne(
  table: string,
  dataIncoming: IInsert[]
): Promise<IUpdateTable> {
  try {
    const columnsName = dataIncoming.map(({column}) => column).join(',');
    const values = dataIncoming.map(({value}) => value);
    const valuesPrepare = values.map(() => '?').join(',');

    const query = `INSERT INTO ${table} (${columnsName}) VALUES (${valuesPrepare})`;

    return sqlSentence(query, values) as Promise<IUpdateTable>;
  } catch (error) {
    return Promise.reject(error);
  }
}
