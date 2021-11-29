import {Response} from 'express';
import {IResponse} from '../interfaces/response.interface';

/**
 * @description Responde una respuesta exitosa
 * @param res Objeto de respuesta de express
 * @param data Data que se va a enviar. @default null
 * @param status Estatus de la respuesta. @default 200
 * @param message Mensaje de la respuesta. @default "Successfull Request"
 * @param success Si la petición fue exitosa o no. @default true
 */
export const success = ({
    res,
    data = null,
    status = 200,
    message = 'Successfull Request',
    success = true,
}: IResponse): void => {
    res.status(status).send({
        data,
        message,
        success,
    });
};

/**
 * @description Responde una respuesta de error
 * @param res Objeto de respuesta de express
 * @param details Los detalles del error
 * @param status  Estatus de la respuesta. default 500
 * @param errorCode Código del error de la respuesta. default 0
 * @param message Mensaje de error. default "Server error"
 */
export const error = ({
    res,
    data = null,
    status = 200,
    message = 'Server error',
    success = false,
    errorCode = 500,
}: IResponse): void => {
    console.error('[response error] ', data);

    res.status(status).send({
        success,
        message,
        errorCode,
        data,
    });
};
