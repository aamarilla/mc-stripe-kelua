import {Application} from 'express';
import paymentIntentRoutes from './components/paymentIntent';
import razerRoutes from './components/razer';

export default (app: Application) => {
    app.use('/payment_intent', paymentIntentRoutes);
    app.use('/razer', razerRoutes);
};
