import axios, {AxiosResponse} from 'axios';
import {Request, Response} from 'express';
import config from '../../config';
import {razerAppVersion} from '../../constants';
import {ICreateOrder} from '../../interfaces/razer/createOrder.interface';
import {createHash256, response} from '../../utils';
import FormData from 'form-data';
import cryptoJs from 'crypto-js';
import qs from 'query-string';
import {IPurchaseInitiation} from '../../interfaces/razer/purchaseInitiation.interface';

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

            const {data: initiateResponse}: AxiosResponse<IPurchaseInitiation> = await axios.post(
                `${config.razerUrl}/pinstore/purchaseinitiation`,
                qs.stringify({
                    applicationCode: config.razerAppCode,
                    version: razerAppVersion,
                    referenceId: orderId,
                    productCode: productId,
                    quantity: String(quantity),
                    signature: initiateSignature,
                    consumerCountryCode: 'PY',
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            const confirmationSignature = cryptoJs
                .MD5(
                    config.razerAppCode +
                        config.razerAppCode +
                        orderId +
                        razerAppVersion +
                        initiateResponse.validatedToken +
                        config.razerSecretKey
                )
                .toString();

            const {data: confirmationResponse} = await axios.post(
                `${config.razerUrl}/pinstore/purchaseconfirmation`,
                qs.stringify({
                    applicationCode: config.razerAppCode,
                    version: razerAppVersion,
                    referenceId: orderId,
                    validatedToken: initiateResponse.validatedToken,
                    signature: confirmationSignature,
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            console.log(confirmationResponse);

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
