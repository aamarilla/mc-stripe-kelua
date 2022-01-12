import {Request, Response} from 'express';
import {stripe} from '../../constants';
import {IConfirmPaymentIntent} from '../../interfaces/paymentIntent/confirmPaymentIntent.interface';
import {ICreatePaymentIntent} from '../../interfaces/paymentIntent/createPaymentIntent.interface';
import {IUpdatePaymentIntent} from '../../interfaces/paymentIntent/updatePaymentIntent.interface';
import {convertToCents, PYGToUSD, response} from '../../utils';

export class PaymentIntentController {
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
