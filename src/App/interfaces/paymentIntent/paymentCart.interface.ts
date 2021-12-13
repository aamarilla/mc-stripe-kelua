import {EPaymentMethod} from '../../enums/paymentMethod.enum';

export interface IPaymentCart {
    metodo: EPaymentMethod;
    monto: number;
    hash: string;
}
