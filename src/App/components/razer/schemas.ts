import Joi from 'joi';
import {JoiNumber, JoiString} from '../../constants/joi';

export const createOrderSchema = Joi.object({
    orderId: JoiString,
    amount: JoiNumber,
    hash: JoiString,
    productId: JoiString,
    returnUrl: JoiString,
    quantity: JoiNumber,
});
