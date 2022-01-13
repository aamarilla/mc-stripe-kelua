export interface ICreateOrder {
    buyer: {
        ruc: string | null;
        email: string;
        name: string;
        phone: string;
        address: string | null;
        ci: string;
    };
    totalAmount: number;
    items: {
        name: string;
        photoUrl: string;
        id: number;
        totalAmount: number;
        quantity: number;
        description: string | null;
    }[];
    orderId: number;
    hash: string;
}
