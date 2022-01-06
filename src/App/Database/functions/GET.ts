/* eslint-disable @typescript-eslint/no-explicit-any */
import {IColumnValue} from '../interfaces/columnValue.interface';
import {IOrder} from '../interfaces/order.interface';
import {IWhere} from '../interfaces/where.interface';
import sqlSentence from '../sqlSentence';

/**
 * @description Busca elementos dentro de una tabla
 * @param table Tabla en donde se va a buscar
 * @param where Condivional where
 * @returns Promise<any[]>
 */
export function find(
  table: string,
  where?: IWhere[],
  order?: IOrder
): Promise<any[]> {
  try {
    const whereString = where
      ?.map(({search, andOr}) => `${search} = ? ${andOr || ''}`)
      .join(' ');

    const values = where?.map(({value}) => value);

    const query = `SELECT * FROM ${table} ${
      whereString ? 'WHERE ' + whereString : ''
    } ${order ? `ORDER BY ${order.column} ${order.order}` : ''}`;
    return sqlSentence(query, values || []) as Promise<any[]>;
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * @description Busca las columnas especificas de los registros de la base de datos
 * @param table Tabla en donde se va a buscar
 * @param data Data que se va a buscar
 * @returns Promise<>
 */
export function findColumnsValue(
  table: string,
  data: IColumnValue
): Promise<any[]> {
  try {
    const columnsReturn = data.columnsReturn.join(',');
    const query = `SELECT ${columnsReturn} FROM ${table} WHERE ${data.columnSearch} = ?`;
    return sqlSentence(query, [data.value]) as Promise<any[]>;
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 *
 * @param table Tabla en la que se va a buscar el registro
 * @param column Nombre de la columna que se va a buscar
 * @param value Valor de la columna que se va a buscar
 * @returns Promise<boolean>
 */
export async function exists(
  table: string,
  column: string,
  value: string | number
): Promise<boolean> {
  try {
    const query = `SELECT COUNT(${column}) FROM ${table} WHERE ${column} = ?`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [result]: any = await sqlSentence(query, [value]);

    return Promise.resolve(result[`COUNT(${column})`] !== 0);
  } catch (error) {
    return Promise.reject(error);
  }
}
