import {EPaymentMethod} from '../../enum/paymentMethod.enum';

export interface IPaymentCart {
    metodo: EPaymentMethod;
    monto: number;
    hash: string;
}
