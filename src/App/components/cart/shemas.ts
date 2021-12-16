import Joi from 'joi';
import {JoiNumber, JoiString} from '../../constants/joi';

export const closeCartSchema = Joi.object({
    method: JoiString,
    amount: JoiNumber,
    hash: JoiString,
    paymentId: JoiNumber,
});
