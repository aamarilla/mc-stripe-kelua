import {Request, Response, NextFunction} from 'express';
import Joi, {ValidationResult, ObjectSchema} from 'joi';
import * as response from '../response';

type check = 'body' | 'params' | 'query' | 'files';

export const validate = (params: Object, schema: ObjectSchema): Joi.ValidationError | undefined => {
    const value: ValidationResult = schema.validate(params);
    return value.error;
};

export default (schema: ObjectSchema, check: check = 'body') => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const error = validate(req[check], schema);
        if (error) {
            response.error({
                res,
                data: error,
                status: 400,
                errorCode: -2,
                message: 'Incorrect parameters',
            });
            next(new Error('Incorrect parameters'));
        } else {
            next();
        }
    };
};
