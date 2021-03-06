import {Application} from 'express';
import healthRoutes from './components/health';
import paymentIntentRoutes from './components/paymentIntent';
import razerRoutes from './components/razer';
import prepaidForgeRoutes from './components/prepaidForge';
import cartRoutes from './components/cart';
import pagoparRoutes from './components/pagopar';

export default (app: Application) => {
    app.use('/health', healthRoutes);
    app.use('/payment_intent', paymentIntentRoutes);
    app.use('/razer', razerRoutes);
    app.use('/prepaid_forge', prepaidForgeRoutes);
    app.use('/cart', cartRoutes);
    app.use('/pagopar', pagoparRoutes);
};
