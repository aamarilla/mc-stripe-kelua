import Joi from 'joi';
import {JoiNumber, JoiString} from '../../constants/joi';

export const paymentIntentIdSchema = Joi.object({
    paymentIntentId: JoiString,
});

export const createPaymentIntentSchema = Joi.object({
    amount: JoiNumber,
    description: JoiString,
});
