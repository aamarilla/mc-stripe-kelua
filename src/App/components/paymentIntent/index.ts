import {Router} from 'express';
import schemaValidation from '../../utils/middlewares/schemaValidation';
import {tokenValidation} from '../../utils/middlewares/tokenValidation';
import {PaymentIntentController} from './PaymentIntentController';
import {createPaymentIntentSchema, paymentIntentIdSchema} from './schemas';

const router = Router();

/**
 * @description Obtiene un intento de pago
 * @method GET
 */
router.get(
    '/:paymentIntentId',
    [tokenValidation, schemaValidation(paymentIntentIdSchema, 'params')],
    PaymentIntentController.getPaymentIntent
);

/**
 * @description Crea un intento de pago
 * @method POST
 */
router.post(
    '/create',
    [tokenValidation, schemaValidation(createPaymentIntentSchema)],
    PaymentIntentController.createPaymentIntent
);

export default router;
