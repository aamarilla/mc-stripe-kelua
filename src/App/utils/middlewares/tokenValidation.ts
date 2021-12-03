import {NextFunction, Request, Response} from 'express';
import {decrypt} from '..';
import config from '../../config';

export const tokenValidation = (req: Request, res: Response, next: NextFunction): void => {
    const bodyDecrypt = decrypt(String(req.body), config.appSecretKey);

    req.body = JSON.parse(bodyDecrypt);
    next();
};
