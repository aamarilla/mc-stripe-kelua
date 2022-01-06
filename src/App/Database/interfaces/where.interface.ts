import {andOrType} from '../types/andOr.type';

export interface IWhere {
  search: string;
  value: string | number;
  andOr?: andOrType;
}
