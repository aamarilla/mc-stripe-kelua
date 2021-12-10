import {Request, Response, Router} from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('<p>Si funciona</p>');
});

router.get('/2', (req: Request, res: Response) => {
    res.send('<p>Si funciona 2</p>');
});

export default router;
