import {Application} from 'express';
import healthRoutes from './components/health';

export default (app: Application) => {
    app.use('/health', healthRoutes)
};
