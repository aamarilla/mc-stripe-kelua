import axios from 'axios';
import {Request, Response} from 'express';
import config from '../../config';
import {razerAppVersion} from '../../constants';
import {ICreateOrder} from '../../interfaces/razer/createOrder.interface';
import {createHash256, response} from '../../utils';
import FormData from 'form-data';
import cryptoJs from 'crypto-js';

export class RazerController {
    /**
     * @description Crea un pedido
     */
    public static async createOrder(req: Request, res: Response): Promise<void> {
        try {
            const {amount, hash, orderId, productId, returnUrl, quantity} =
                req.body as ICreateOrder;

            const hashRequest = createHash256(orderId + config.appSecretKey + productId);

            if (hash !== hashRequest) {
                response.error({
                    res,
                    data: 'Unauthorized',
                    errorCode: -1,
                    message: 'User not authorized',
                    status: 401,
                });
                return;
            }

            response.success({res, data: null});

            let formData = new FormData();
            formData.append('applicationCode', config.razerAppCode);
            formData.append('version', razerAppVersion);
            formData.append('referenceId', orderId);
            formData.append('productCode', productId);
            formData.append('quantity', String(quantity));

            const initiateSignature = cryptoJs
                .MD5(
                    config.razerAppCode +
                        productId +
                        quantity +
                        orderId +
                        razerAppVersion +
                        config.razerSecretKey
                )
                .toString();

            formData.append('signature', initiateSignature);

            const {data: initiateResponse} = await axios.post(
                `${config.razerUrl}/pinstore/purchaseinitiation`,
                formData
            );

            console.log(initiateResponse);

            // formData = new FormData();

            // await axios.post(returnUrl, {data: initiateResponse});
        } catch (error) {
            response.error({
                res,
                // @ts-ignore
                data: error,
            });
        }
    }
}
