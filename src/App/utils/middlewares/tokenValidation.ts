import {NextFunction, Request, Response} from 'express';
import {decrypt, response} from '..';
import config from '../../config';

export const tokenValidation = (req: Request, res: Response, next: NextFunction): void => {
    try {
        if (req.method !== 'GET' && req.method !== 'DELETE') {
            const bodyDecrypt = decrypt(String(req.body), config.appSecretKey);

            req.body = JSON.parse(bodyDecrypt);
        }
        next();
    } catch (error) {
        response.error({res, data: error, status: 401, errorCode: -1});
    }
};
