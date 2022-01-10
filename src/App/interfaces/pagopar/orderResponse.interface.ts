export interface IOrderResponse {
    respuesta: boolean;
    resultado: {
        pagado: boolean;
        forma_pago: string;
        fecha_pago: null | string;
        monto: string;
        fecha_maxima_pago: string;
        hash_pedido: string;
        numero_pedido: string;
        cancelado: boolean;
        forma_pago_identificador: string;
        token: string;
    }[];
}
