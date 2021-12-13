export interface IProduct {
    productID: number;
    productCode: string;
    productName: string;
    productDescription: string;
    smallProductImage: string;
    supplierID: number;
    gameID: number;
    supplierName: string;
    gameName: string;
    isStockAvailable: boolean;
    stockQuantity: number;
    commission: number;
    sellingPrice: number;
    payablePrice: string;
    price: number;
    unitPrice: string;
    currency: string;
    commissionAmount: string;
    taxAmount: string;
    recommendedRetailPrice: string;
}
