import {Router} from 'express';
import schemaValidation from '../../utils/middlewares/schemaValidation';
import {CartController} from './CartController';
import {closeCartSchema} from './shemas';

const router = Router();

/**
 * @description Cierra el carrito de compras
 * @method
 */
router.post('/close', [schemaValidation(closeCartSchema)], CartController.closeCart);

export default router;
