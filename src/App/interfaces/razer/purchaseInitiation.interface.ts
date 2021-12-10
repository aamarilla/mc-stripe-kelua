export interface IPurchaseInitiation {
    referenceId: string;
    userId: string;
    userName: string;
    productCode: string;
    quantity: string;
    initiationResultCode: string;
    validatedToken: string;
    currency: string;
    estimateUnitPrice: string;
    version: string;
    signature: string;
    applicationCode: string;
}
