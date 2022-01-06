import {IUpdateTable} from '../interfaces/updateTable.interface';
import {IWhere} from '../interfaces/where.interface';
import sqlSentence from '../sqlSentence';

/**
 * @description Elimina una o varios registros de una tabla
 * @param table Tabla en la que se va a eliminar la(s) filas
 * @param where Condicional de busqueda
 * @returns Promise<IUpdateTable>
 */
export const deleteRow = (
    table: string,
    where: IWhere[]
): Promise<IUpdateTable> => {
    const whereString = where
        .map(({search, andOr}) => `${search} = ? ${andOr || ''}`)
        .join(' ');
    const whereValues = where.map(({value}) => value);

    const sql = `DELETE FROM ${table} WHERE ${whereString}`;

    return sqlSentence(sql, whereValues) as Promise<IUpdateTable>;
};
