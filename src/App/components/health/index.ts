import { Router, Request, Response } from 'express';
import { response } from '../../utils';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    response.success(res);
})