import {EPaymentMethod} from '../../enums/paymentMethod.enum';

export interface ICloseCart {
    method: EPaymentMethod;
    amount: number;
    hash: string;
    paymentId: number;
}
