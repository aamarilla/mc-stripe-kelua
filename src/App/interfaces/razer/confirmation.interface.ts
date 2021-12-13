export interface IConfirmation {
    referenceId: string;
    paymentId: string;
    userId: string;
    productCode: string;
    quantity: string;
    deliveredQuantity: string;
    currency: string;
    unitPrice: string;
    totalPrice: string;
    merchantProductCode: string;
    purchaseStatusCode: string;
    purchaseStatusDate: string;
    coupons: {expiryDate: string; serials: any[]; pins: any[]}[];
    productDescription: string;
    totalPayablePrice: string;
    taxAmount: string;
    recommendedRetailPrice: string;
    isReversible: boolean;
    version: string;
    signature: string;
    applicationCode: string;
}
