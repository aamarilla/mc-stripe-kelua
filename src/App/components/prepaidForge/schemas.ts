import Joi from 'joi';
import {JoiNumber, JoiString} from '../../constants/joi';

export const getBalanceSchema = Joi.object({
    email: JoiString,
    password: JoiString,
});

export const createOrderSchema = Joi.object({
    sku: JoiString,
    price: JoiNumber,
    codeType: JoiString,
    customOrderReference: JoiString,
    email: JoiString,
    password: JoiString,
});

export const signInSchema = Joi.object({
    email: JoiString,
    password: JoiString,
});
