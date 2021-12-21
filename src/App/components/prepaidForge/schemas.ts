import Joi, {string} from 'joi';
import {JoiNumber, JoiNumberOptional, JoiString} from '../../constants/joi';

export const getProductsQuerySchema = Joi.object({
    pageSize: JoiNumberOptional,
    page: JoiNumberOptional,
});

export const getStockSchema = Joi.object({
    email: JoiString,
    password: JoiString,
    skus: Joi.array().items(JoiString),
});

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
