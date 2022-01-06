import {Router} from 'express';
import schemaValidation from '../../utils/middlewares/schemaValidation';
import {PagoParController} from './PagoparController';
import {createOrderSchema} from './schemas';

const router = Router();

/**
 * @description Crea una orden de pago
 * @method POST
 */
router.post('/create', [schemaValidation(createOrderSchema)], PagoParController.createOrder);

export default router;
