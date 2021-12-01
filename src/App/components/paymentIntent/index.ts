import {Router} from 'express';
import schemaValidation from '../../utils/middlewares/schemaValidation';
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
    [schemaValidation(paymentIntentIdSchema, 'params')],
    PaymentIntentController.getPaymentIntent
);

/**
 * @description Confirma un intento de pago
 */
router.post(
    '/confirm',
    [schemaValidation(confirmPaymentIntentSchema)],
    PaymentIntentController.confirmPaymentIntent
);

/**
 * @description Crea un intento de pago
 * @method POST
 */
router.post(
    '/create',
    [schemaValidation(createPaymentIntentSchema)],
    PaymentIntentController.createPaymentIntent
);

export default router;
