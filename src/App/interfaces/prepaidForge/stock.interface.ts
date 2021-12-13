import {EPrepaidForgeCodeType} from '../../enums/prepaidForgeCodeType.enum';

export interface IStock {
    product: string;
    type: EPrepaidForgeCodeType;
    quantity: number;
    purchasePrice: number;
}
