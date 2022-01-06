import mysql from 'mysql';
import config from '../config';

export * from './functions';
export {IInsert} from './interfaces/insert.interface';

const {host, dbUser, dbPassword, dbName} = config;

export const pool = mysql.createPool({
    host,
    user: dbUser,
    password: dbPassword,
    database: dbName,
    connectionLimit: 1000,
});
