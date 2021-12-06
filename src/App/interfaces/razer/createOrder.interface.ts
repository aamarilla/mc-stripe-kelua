export interface ICreateOrder {
    orderId: string;
    amount: number;
    hash: string;
    productId: string;
    returnUrl: string;
    quantity: number;
}
