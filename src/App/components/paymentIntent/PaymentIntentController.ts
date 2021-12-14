import axios from 'axios';
import {Request, Response} from 'express';
import config from '../../config';
import {stripe} from '../../constants';
import {EPaymentMethod} from '../../enums/paymentMethod.enum';
import {IConfirmPaymentIntent} from '../../interfaces/paymentIntent/confirmPaymentIntent.interface';
import {ICreatePaymentIntent} from '../../interfaces/paymentIntent/createPaymentIntent.interface';
import {IPaymentCart} from '../../interfaces/paymentIntent/paymentCart.interface';
import {IUpdatePaymentIntent} from '../../interfaces/paymentIntent/updatePaymentIntent.interface';
import {convertToCents, PYGToUSD, response, createHash256} from '../../utils';

export class PaymentIntentController {
    /**
     * @description Actualiza un intento de pago
     */
    public static async updatePaymentIntent(req: Request, res: Response): Promise<void> {
        try {
            const {paymentIntentId} = req.params;
            const {amount} = req.body as IUpdatePaymentIntent;

            const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
                amount: convertToCents(PYGToUSD(amount)),
            });

            response.success({res, data: paymentIntent});
        } catch (error) {
            response.error({res, data: error});
        }
    }

    /**
     * @description Obtiene un intento de pago
     */
    public static async getPaymentIntent(req: Request, res: Response): Promise<void> {
        try {
            const {paymentIntentId} = req.params;

            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

            response.success({res, data: paymentIntent});
        } catch (error) {
            response.error({res, data: error});
        }
    }

    /**
     * @description Confirma un intento de pago
     */
    public static async confirmPaymentIntent(req: Request, res: Response): Promise<void> {
        try {
            const {paymentIntentId} = req.body as IConfirmPaymentIntent;

            const confirmPaymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);

            response.success({res, data: confirmPaymentIntent});
        } catch (error) {
            response.error({res, data: error});
        }
    }

    /**
     * @description Crea el intento de pago
     */
    public static async createPaymentIntent(req: Request, res: Response): Promise<void> {
        try {
            const {amount, description} = req.body as ICreatePaymentIntent;

            const {client_secret, id} = await stripe.paymentIntents.create({
                amount: convertToCents(PYGToUSD(amount)),
                currency: 'usd',
                description,
                automatic_payment_methods: {
                    enabled: true,
                },
            });

            const paymentCart: IPaymentCart = {
                metodo: EPaymentMethod.Stripe,
                monto: amount,
                hash: createHash256(amount + config.appSecretKey),
            };

            // const paymentResponse = await axios.post(
            //     `${config.pagosGamerUrl}/api/carrito/pagar`,
            //     paymentCart,
            //     {
            //         headers: {
            //             authorization: req.headers.authorization as string,
            //         },
            //     }
            // );

            // console.log(paymentResponse);

            response.success({
                res,
                data: {
                    clientSecret: client_secret,
                    paymentIntentId: id,
                },
                status: 201,
            });
        } catch (error) {
            // @ts-ignore
            response.error({res, data: error});
        }
    }
}
