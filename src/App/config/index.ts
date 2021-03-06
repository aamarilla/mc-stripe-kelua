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
    appSecretKey: String(process.env.APP_SECRET_KEY),
    pagosGamerUrl: 'https://appdev2.piston.com.py',
    razerUrl:
        process.env.NODE_ENV !== 'production'
            ? 'http://sandbox-api.mol.com'
            : 'https://api.mol.com',
    razerAppCode: String(process.env.RAZER_APP_CODE),
    razerSecretKey: String(process.env.RAZER_APP_SECRET_KEY),
    prepaidForgeUrl: 'https://api.prepaidforge.com/v1/1.0',
    pagoparUrl: 'https://api.pagopar.com/api',
    pagoparPrivateKey: String(process.env.PAGOPAR_PRIVATE_TOKEN),
    pagoparPublicKey: String(process.env.PAGOPAR_PUBLIC_TOKEN),
    dbUser: String(process.env.DB_USER),
    dbPassword: String(process.env.DB_PASSWORD),
    dbPort: String(process.env.DB_PORT),
    dbName: String(process.env.DB_NAME),
};
