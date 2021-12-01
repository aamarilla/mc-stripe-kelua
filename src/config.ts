import {config as dotenv} from 'dotenv';
import {join} from 'path';

dotenv();

export default {
    dev: process.env.NODE_ENV !== 'production',
    port: Number(process.env.PORT),
    host: String(process.env.HOST),
    cors: String(process.env.CORS),
    publicRoute: join(__dirname, String(process.env.PUBLIC_ROUTE)),
    cryptPass: String(process.env.CRYPT_PASS),
    stripeKey: String(process.env.STRIPE_SECRET_KEY),
};
