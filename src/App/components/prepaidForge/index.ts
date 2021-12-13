import {Router} from 'express';
import schemaValidation from '../../utils/middlewares/schemaValidation';
import {PrepaidForgeController} from './PrepaidForgeController';
import {createOrderSchema, getBalanceSchema, getStockSchema} from './schemas';

const router = Router();

/**
 * @description Obtiene el stock de un producto
 * @method POST
 */
router.post('/stock', [schemaValidation(getStockSchema)], PrepaidForgeController.getStockBySku);

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
