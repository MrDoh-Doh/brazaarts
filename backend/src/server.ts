import { app } from './app';
import { env } from './config/env';

app.listen(env.API_PORT, () => {
  console.log(`BazaArts API listening on port ${env.API_PORT}`);
  console.log('Created by Nick Thomas & CoPi');
});
