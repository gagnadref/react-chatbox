import server from './server';
import socketServer from './server/socket-server';

const config = {};

config.port = 3000;
config.host = 'localhost';
server.locals.assetPath = '';
server.locals.isDevelopment = false;

if (process.env.NODE_ENV === 'development') {
  server.locals.assetPath = 'http://localhost:8080/';
  server.locals.isDevelopment = true;
}

const webServer = server.listen(config.port, config.host, (err) => {
  if (err) throw err;
  console.log('Web server listening at http://%s:%d', config.host, config.port);
});

socketServer(webServer);
