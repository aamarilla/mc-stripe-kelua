import axios from 'axios';
import {Request, Response} from 'express';
import config from '../../config';
import {ICloseCart} from '../../interfaces/cart/closeCart.interface';
import {createHash256, response} from '../../utils';

export class CartController {
    /**
     * @description Cierra el carrito de comprar
     */
    public static async closeCart(req: Request, res: Response): Promise<void> {
        try {
            const {amount, hash, method, paymentId} = req.body as ICloseCart;
            const hashVerify = createHash256(
                String(paymentId) + amount.toFixed(2) + config.appSecretKey
            );
            console.log(String(paymentId) + String(amount) + config.appSecretKey);
            console.log(hashVerify);

            if (hashVerify !== hash) {
                response.success({
                    res,
                    data: 'UNAUTHORIZED',
                    errorCode: -1,
                    message: 'Invalid hash',
                    status: 401,
                    success: false,
                });
                return;
            }

            const {data: closeResponse} = await axios.post(
                `${config.pagosGamerUrl}/api/pagos/${paymentId}/cerrar`,
                {
                    monto: amount,
                    metodo: method,
                    hash,
                    estado: 'autorizado',
                },
                {
                    headers: {
                        Authorization: String(req.headers.authorization),
                    },
                }
            );

            response.success({res, data: closeResponse});
        } catch (error) {
            response.error({res, data: error});
        }
    }
}
