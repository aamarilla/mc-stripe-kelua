import {Application} from 'express';
import paymentIntentRoutes from './components/paymentIntent';

export default (app: Application) => {
    app.use('/payment_intent', paymentIntentRoutes);
};
