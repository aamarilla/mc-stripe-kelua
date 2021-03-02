import App from './App';
import config from './config';

App.listen(config.port, () => {
  console.log(`Escuchando en ${config.host}:${config.port}`);
});
