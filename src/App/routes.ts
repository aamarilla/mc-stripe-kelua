import {Application} from 'express';
import healthRoutes from './components/health';
import paymentIntentRoutes from './components/paymentIntent';
import razerRoutes from './components/razer';
import prepaidForgeRoutes from './components/prepaidForge';

export default (app: Application) => {
    app.use('/health', healthRoutes);
    app.use('/payment_intent', paymentIntentRoutes);
    app.use('/razer', razerRoutes);
    app.use('/prepaid_forge', prepaidForgeRoutes);
};
