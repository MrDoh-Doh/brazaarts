import http from 'node:http';
import { app } from './app';
import { env } from './config/env';
import { createSocketServer } from './realtime/socket';

const server = http.createServer(app);
createSocketServer(server);

server.listen(env.API_PORT, () => {
  console.log(`BazaArts API listening on port ${env.API_PORT}`);
  console.log('Created by Nick Thomas & CoPi');
});
