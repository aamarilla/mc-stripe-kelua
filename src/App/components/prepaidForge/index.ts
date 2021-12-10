import {Router} from 'express';
import schemaValidation from '../../utils/middlewares/schemaValidation';
import {PrepaidForgeController} from './PrepaidForgeController';
import {createOrderSchema, getBalanceSchema} from './schemas';

const router = Router();

/**
 * @description Obtiene el balance de ¨Prepaid Forge
 * @method POST
 */
router.post('/balance', [schemaValidation(getBalanceSchema)], PrepaidForgeController.getBalance);

/**
 * @description Obtiene los productos
 * @method GET
 */
router.get('/products', PrepaidForgeController.getProducts);

/**
 * @description Crea una orden
 * @method POST
 */
router.post(
    '/create_order',
    [schemaValidation(createOrderSchema)],
    PrepaidForgeController.createOrder
);

export default router;
