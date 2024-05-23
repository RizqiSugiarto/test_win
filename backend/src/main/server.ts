import { prismaClient } from "../infra/postgre_db";
import { App, Env } from "./config";

prismaClient
  .createConnection()
  .then(async () => {
    void (await Promise.resolve());
    const app = App();
    app.listen(Env.PORT, () => console.log(`\n> Server is running on port ${Env.PORT}`));
  })
  .catch((err) => console.log(err));