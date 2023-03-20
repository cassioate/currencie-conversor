import { DataTypes } from "sequelize";
import { UmzugMigration } from "../../types/umzug-migration.type";

const table = {
  name: "accepted_currencies",
  schema: "public",
};

export const up = async (migration: UmzugMigration) => {
  const query = migration.context.getQueryInterface();

  await query.createTable(
    {
      tableName: table.name,
      schema: table.schema,
    },
    {
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
    }
  );
};

export const down = async (migration: UmzugMigration) => {
  const query = migration.context.getQueryInterface();

  await query.dropTable({
    tableName: table.name,
    schema: table.schema,
  });
};
