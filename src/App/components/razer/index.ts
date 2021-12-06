import {Router} from 'express';
import schemaValidation from '../../utils/middlewares/schemaValidation';
import {RazerController} from './RazerController';
import {createOrderSchema} from './schemas';

const router = Router();

/**
 * @description Crea un pedido
 * @method POST
 */
router.post('/create_order', [schemaValidation(createOrderSchema)], RazerController.createOrder);

export default router;
