import {IInsert} from '../interfaces/insert.interface';
import {IUpdateTable} from '../interfaces/updateTable.interface';
import {IWhere} from '../interfaces/where.interface';
import sqlSentence from '../sqlSentence';

/**
 * @description Actualiza un registro en la tabla
 * @param table Tabla que se va a actualizar
 * @param where Condicional de where
 * @param dataNext Data que va a ser actualizada o insertada
 * @returns Promise<IUpdateTable>
 */
export function updateOne(
  table: string,
  where: IWhere[],
  dataNext: IInsert[]
): Promise<IUpdateTable> {
  try {
    const whereString = where
      .map(({search, andOr}) => `${search} = ? ${andOr || ''}`)
      .join(' ');
    const whereValues = where.map(({value}) => value);
    const columns = dataNext.map(({column}) => `${column} = ?`).join(',');
    const values = dataNext.map(({value}) => value);

    values.push(...whereValues);

    const query = `UPDATE ${table} SET ${columns} WHERE ${whereString}`;

    return sqlSentence(query, values) as Promise<IUpdateTable>;
  } catch (error) {
    return Promise.reject(error);
  }
}
