import App from './App';
import config from './App/config';

App.listen(config.port, () => {
    console.log(`Escuchando en ${config.host}:${config.port}`);
});
