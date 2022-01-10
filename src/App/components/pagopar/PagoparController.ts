import {Request, Response} from 'express';
import {ICreateOrder} from '../../interfaces/pagopar/createOrder.interface';
import {response} from '../../utils';
import CryptoJS from 'crypto-js';
import config from '../../config';
import axios from 'axios';

export class PagoParController {
    /**
     * @description Enpoint de respuesta PARA Pagopar
     */
    public static async responseOrder(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body, req.params, req.query);
            response.success({res, data: null});
        } catch (error) {
            response.error({res, data: error});
        }
    }

    /**
     * @description Crea el pedido de pagopar
     */
    public static async createOrder(req: Request, res: Response): Promise<void> {
        try {
            const {buyer, items, orderId, totalAmount} = req.body as ICreateOrder;
            const {address, ci, email, name, phone, ruc} = buyer;

            const date = new Date(Date.now() - new Date().getTimezoneOffset());
            date.setDate(date.getDate() + 1);
            const year = date.getFullYear();
            const month =
                ((date.getMonth() + 1).toString().length === 1 ? '0' : '') +
                (date.getMonth() + 1).toString();
            const day =
                (date.getDate().toString().length === 1 ? '0' : '') + date.getDate().toString();
            const hours = `${String(date.getHours()).length === 1 ? '0' : ''}` + date.getHours();
            const minutes =
                `${String(date.getMinutes()).length === 1 ? '0' : ''}` + date.getMinutes();
            const seconds =
                `${String(date.getSeconds()).length === 1 ? '0' : ''}` + date.getSeconds();
            const time = `${hours}:${minutes}:${seconds}`;
            const fechaMaximaPago = `${year}-${month}-${day} ${time}`;

            console.log(fechaMaximaPago);

            const createOrderBody = {
                token: CryptoJS.SHA1(
                    config.pagoparPrivateKey + String(orderId) + String(totalAmount)
                ).toString(),
                comprador: {
                    ruc: ruc || '',
                    email,
                    ciudad: 1,
                    nombre: name,
                    telefono: phone,
                    direccion: address || '',
                    documento: ci,
                    coordenadas: '',
                    razon_social: '',
                    tipo_documento: 'CI',
                    direccion_referencia: '',
                },
                public_key: config.pagoparPublicKey,
                monto_total: totalAmount,
                tipo_pedido: 'VENTA-COMERCIO',
                compras_items: items.map((item) => ({
                    ciudad: 1,
                    nombre: item.name,
                    cantidad: item.quantity,
                    categoria: 909,
                    public_key: config.pagoparPublicKey,
                    url_imagen: item.photoUrl,
                    descripcion: item.description || '',
                    id_producto: item.id,
                    precio_total: item.totalAmount,
                    vendedor_telefono: '',
                    vendedor_direccion: '',
                    vendedor_direccion_referencia: '',
                    vendedor_direccion_coordenadas: '',
                })),
                id_pedido_comercio: orderId,
                descripcion_resumen: '',
                fecha_maxima_pago: fechaMaximaPago,
            };

            const {data: createResponse} = await axios.post(
                `${config.pagoparUrl}/comercios/1.1/iniciar-transaccion`,
                createOrderBody
            );

            response.success({res, data: createResponse});
        } catch (error) {
            response.error({res, data: error});
        }
    }
}
