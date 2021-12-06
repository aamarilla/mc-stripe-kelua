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

            const initiateFormData = new FormData();
            initiateFormData.append('applicationCode', config.razerAppCode);
            initiateFormData.append('version', razerAppVersion);
            initiateFormData.append('referenceId', orderId);
            initiateFormData.append('productCode', productId);
            initiateFormData.append('quantity', String(quantity));

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

            initiateFormData.append('signature', initiateSignature);

            // console.log(initiateFormData);

            const {data: initiateResponse} = await axios.post(
                `${config.razerUrl}/pinstore/purchaseinitiation`,
                initiateFormData
            );

            console.log(initiateResponse);
        } catch (error) {
            response.error({
                res,
                // @ts-ignore
                data: error,
            });
        }
    }
}
