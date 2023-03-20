import { DataTypes } from "sequelize";
import { UmzugMigration } from "../../types/umzug-migration.type";

const table = {
  name: "accepted_currencies",
  schema: "public",
};

const seed = [
  { currency: "USD" },
  { currency: "EUR" },
  { currency: "INR" },
  { currency: "BRL" },
];

export const up = async (migration: UmzugMigration) => {
  const query = migration.context.getQueryInterface();

  await query.bulkInsert(
    {
      tableName: table.name,
      schema: table.schema,
    },
    seed
  );
};

export const down = async (migration: UmzugMigration) => {
  const query = migration.context.getQueryInterface();

  await query.bulkDelete(
    {
      tableName: table.name,
      schema: table.schema,
    },
    { currency: seed.map((seed) => seed.currency) }
  );
};
