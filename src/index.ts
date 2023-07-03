import { Knex as knex } from '@server/database/knex';
import { server } from '@server/server';

const port: string | undefined = process.env.PORT;

const startServer = () => {
  server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${ port }`);
  });
};

if (process.env.IS_LOCALHOST !== 'true') {
  knex.migrate.latest()
    .then(() => startServer())
    .catch(console.log);
} else {
  startServer();
}

