import { SequelizeStorage, Umzug } from "umzug";
import { SequelizeHelper } from "../../db/helpers/sequelize-helper";

export const seedMigrator = async () => {
  await SequelizeHelper.connect();
  return new Umzug({
    migrations: {
      glob: "src/db/sequelize/seeders/*.seed.ts",
    },
    context: SequelizeHelper.getClient(),
    storage: new SequelizeStorage({
      sequelize: SequelizeHelper.getClient(),
      modelName: "seeder_meta",
    }),
    logger: console,
  });
};
