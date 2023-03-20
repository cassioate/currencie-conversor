import { SequelizeHelper } from "../db/helpers/sequelize-helper";
import app from "./config/app";
import env from "./config/env";

SequelizeHelper.connect()
  .then((db) => {
    db.authenticate();
    app.listen(env.PORT, () =>
      console.log(`Server running at http://localhost:${env.PORT}`)
    );
  })
  .catch(console.error);
