import { server } from '@server/server';

const port: string | undefined = process.env.PORT;

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
