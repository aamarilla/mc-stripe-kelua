import {Response} from 'express';

/**
 * @description Responde una respuesta exitosa
 * @param res Objeto de respuesta de express
 * @param data Data que se va a enviar. @default null
 * @param status Estatus de la respuesta. @default 200
 * @param message Mensaje de la respuesta. @default "Successfull Request"
 * @param success Si la petición fue exitosa o no. @default true
 */
export const success = (
  res: Response,
  data: any = null,
  status: number = 200,
  message: string = 'Successfull Request',
  success: boolean = true
): void => {
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
 * @param status  Estatus de la respuesta. @default 500
 * @param errorCode Código del error de la respuesta. @default 0
 * @param message Mensaje de error. @default "Server error"
 */
export const error = (
  res: Response,
  details: any,
  status: number = 500,
  errorCode: number = 0,
  message: string = 'Server error'
): void => {
  console.error('[response error] ', details);

  res.status(status).send({
    success: false,
    message,
    errorCode,
    details,
  });
};