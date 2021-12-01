import Joi from 'joi';

export const JoiString = Joi.string().required();
export const JoiNumber = Joi.number().required();
export const JoiEmail = Joi.string().required().email().max(50).trim().lowercase();
export const JoiAny = Joi.any().required();
export const JoiArray = Joi.array().required();
export const JoiBoolean = Joi.boolean().required();

export const JoiStringOptional = Joi.string().optional().allow(null);
export const JoiNumberOptional = Joi.number().optional().allow(null);
