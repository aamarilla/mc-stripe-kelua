import {Router} from 'express';
import schemaValidation from '../../utils/middlewares/schemaValidation';
import {PagoParController} from './PagoparController';
import {createOrderSchema} from './schemas';

const router = Router();

/**
 * @description Obtiene los detalles de un pago de pagopar
 * @method GET
 */
router.get('/:hash', PagoParController.getPayment);

/**
 * @description Endpoint de respuesta de un pago PARA Pagopar
 * @method POST
 */
router.post('/respuesta', PagoParController.responseOrder);

/**
 * @description Crea una orden de pago
 * @method POST
 */
router.post('/create', [schemaValidation(createOrderSchema)], PagoParController.createOrder);

export default router;
