import Joi from 'joi';
import {JoiNumber, JoiString} from '../../constants/joi';

export const updatePaymentIntentSchema = Joi.object({
    amount: JoiNumber,
});

export const paymentIntentIdSchema = Joi.object({
    paymentIntentId: JoiString,
});

export const confirmPaymentIntentSchema = Joi.object({
    paymentIntentId: JoiString,
});

export const createPaymentIntentSchema = Joi.object({
    amount: JoiNumber,
    description: JoiString,
});
