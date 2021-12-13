import axios, {AxiosResponse} from 'axios';
import {Request, Response} from 'express';
import config from '../../config';
import {ISignInResponse} from '../../interfaces/prepaidForge/signInResponse.interface';
import {response} from '../../utils';
import {ICreateOrder} from '../../interfaces/prepaidForge/createOrder.interface';
import {ICreateOrderResponse} from '../../interfaces/prepaidForge/createOrderResponse.interface';
import {IProduct} from '../../interfaces/prepaidForge/product.interface';
import {IGetBalance} from '../../interfaces/prepaidForge/getBalance.interface';
import {IBalance} from '../../interfaces/prepaidForge/balance.interface';
import {IGetStockBySku} from '../../interfaces/prepaidForge/getStockBySku.interface';
import {IStock} from '../../interfaces/prepaidForge/stock.interface';
import {EPrepaidForgeCodeType} from '../../enums/prepaidForgeCodeType.enum';

export class PrepaidForgeController {
    /**
     * @description Obtiene el stock de un producto
     */
    public static async getStockBySku(req: Request, res: Response): Promise<void> {
        try {
            const {skus, email, password} = req.body as IGetStockBySku;

            const {apiToken} = await PrepaidForgeController.signInAPI(email, password);

            const {data: stockResponse}: AxiosResponse<IStock[]> = await axios.post(
                '/findStocks',
                {
                    types: [EPrepaidForgeCodeType.Scan, EPrepaidForgeCodeType.Text],
                    skus,
                },
                {
                    headers: {
                        'x-prepaidforge-api-token': apiToken,
                    },
                }
            );

            response.success({res, data: stockResponse});
        } catch (error) {
            response.error({res, data: error});
        }
    }

    /**
     * @description Obtiene el balance de Prepaid Forge
     */
    public static async getBalance(req: Request, res: Response): Promise<void> {
        try {
            const {email, password} = req.body as IGetBalance;
            const {apiToken} = await PrepaidForgeController.signInAPI(email, password);

            const {data: balanceResponse}: AxiosResponse<IBalance> = await axios.get(
                `${config.prepaidForgeUrl}/balance`,
                {
                    headers: {
                        'x-prepaidforge-api-token': apiToken,
                    },
                }
            );

            response.success({res, data: balanceResponse});
        } catch (error) {
            response.error({res, data: error});
        }
    }

    /**
     * @description Obtiene los productos
     */
    public static async getProducts(req: Request, res: Response): Promise<void> {
        try {
            const {data: productsResponse}: AxiosResponse<IProduct[]> = await axios.get(
                `${config.prepaidForgeUrl}/findAllProducts`
            );

            response.success({res, data: productsResponse});
        } catch (error) {
            response.error({res, data: error});
        }
    }

    /**
     * @description Crea un pedido
     */
    public static async createOrder(req: Request, res: Response): Promise<void> {
        try {
            const {codeType, customOrderReference, price, sku, email, password} =
                req.body as ICreateOrder;

            const {apiToken} = await PrepaidForgeController.signInAPI(email, password);

            const {data: createOrderResponse}: AxiosResponse<ICreateOrderResponse> =
                await axios.post(
                    `${config.prepaidForgeUrl}/createApiOrder`,
                    {
                        sku,
                        price,
                        codeType,
                        customOrderReference,
                    },
                    {
                        headers: {
                            'X-PrepaidForge-Api-Token': apiToken,
                        },
                    }
                );

            response.success({res, data: createOrderResponse, status: 201});
        } catch (error) {
            // @ts-ignore
            response.error({res, data: error?.toJSON() || error});
        }
    }

    /**
     * @description Loguea a un usuario de PrepaidForge
     */
    private static async signInAPI(email: string, password: string): Promise<ISignInResponse> {
        try {
            const {data: signInResponse}: AxiosResponse<ISignInResponse> = await axios.post(
                `${config.prepaidForgeUrl}/signInWithApi`,
                {email, password}
            );

            return Promise.resolve(signInResponse);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
