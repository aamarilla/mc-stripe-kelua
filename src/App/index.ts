import express, {Application} from 'express';
import {createServer, Server} from 'http';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import config from './config';
import Routes from './routes';
import {createProxyMiddleware} from 'http-proxy-middleware';

class App {
    private app: Application;
    public server: Server;

    constructor() {
        this.app = express();
        this.config();
        this.server = createServer(this.app);
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(express.text());
        this.app.use(
            cors({
                exposedHeaders: ['token'],
                origin: config.cors,
            })
        );
        this.app.use(
            fileUpload({
                createParentPath: true,
            })
        );
        this.app.use('/public', express.static(config.publicRoute));
        this.app.use(
            '/api',
            createProxyMiddleware({
                target: 'https://appdev2.piston.com.py',
                changeOrigin: true,
                cookieDomainRewrite: 'localhost',
            })
        );
        Routes(this.app);
    }
}

export default new App().server;
