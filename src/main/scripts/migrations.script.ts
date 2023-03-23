import { SequelizeStorage, Umzug } from "umzug";
import { SequelizeHelper } from "../../db/helpers/sequelize-helper";

export const migrator = async () => {
  await SequelizeHelper.connect();
  return new Umzug({
    migrations: {
      glob: "src/db/sequelize/migrations/*.migration.ts",
    },
    context: SequelizeHelper.getClient(),
    storage: new SequelizeStorage({
      sequelize: SequelizeHelper.getClient(),
      modelName: "sequelize_meta",
    }),
    logger: console,
  });
};
