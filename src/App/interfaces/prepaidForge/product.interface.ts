export interface IProduct {
    sku: string;
    name: string;
    gtin: string;
    ean: null;
    brand: string;
    faceValue: {
        amount: number;
        currency: string;
        formattedString: string;
        csvamount: string;
        roundedFormattedString: string;
    };
    defaultPrice: null | number;
    currencyCode: string;
    isCurrencyProduct: boolean;
    imageUrl: string;
    active: boolean;
    languages: string[];
    countries: string[];
    platforms: string[];
    rating: string;
    categories: string[];
}
