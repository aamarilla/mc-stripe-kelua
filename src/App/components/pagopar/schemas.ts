import Joi, {string} from 'joi';
import {JoiNumber, JoiString, JoiStringOptional} from '../../constants/joi';

export const getPaymentSchema = Joi.object({
    hash: JoiString,
    orderId: JoiNumber,
    amount: JoiNumber,
});

export const createOrderSchema = Joi.object({
    buyer: Joi.object({
        ruc: JoiStringOptional,
        email: JoiString,
        name: JoiString,
        phone: JoiString,
        address: JoiStringOptional,
        ci: JoiString,
    }).required(),
    totalAmount: JoiNumber,
    items: Joi.array().items(
        Joi.object({
            name: JoiString,
            photoUrl: JoiString,
            id: JoiNumber,
            totalAmount: JoiNumber,
            quantity: JoiNumber,
            description: JoiStringOptional,
        })
    ),
    orderId: JoiNumber,
    hash: JoiString,
});
