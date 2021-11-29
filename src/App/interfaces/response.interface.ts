import {Response} from 'express';

export interface IResponse {
    res: Response;
    data: any | null;
    status?: number;
    message?: string;
    errorCode?: number;
    success?: boolean;
}
