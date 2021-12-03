import {Router} from 'express';
import schemaValidation from '../../utils/middlewares/schemaValidation';
import {tokenValidation} from '../../utils/middlewares/tokenValidation';
import {PaymentIntentController} from './PaymentIntentController';
import {
    confirmPaymentIntentSchema,
    createPaymentIntentSchema,
    paymentIntentIdSchema,
    updatePaymentIntentSchema,
} from './schemas';

const router = Router();

/**
 * @description Actualiza un intento de pago
 * @method PUT
 */
router.put(
    '/update/:paymentIntentId',
    [
        tokenValidation,
        schemaValidation(paymentIntentIdSchema, 'params'),
        schemaValidation(updatePaymentIntentSchema),
    ],
    PaymentIntentController.updatePaymentIntent
);

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
 * @description Confirma un intento de pago
 */
router.post(
    '/confirm',
    [tokenValidation, schemaValidation(confirmPaymentIntentSchema)],
    PaymentIntentController.confirmPaymentIntent
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
