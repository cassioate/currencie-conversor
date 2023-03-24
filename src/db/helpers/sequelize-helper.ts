import { Sequelize } from "sequelize";
import { Options } from "sequelize/types/sequelize";
import env from "../../main/config/env";

export class SequelizeHelper {
  private static client: Sequelize;

  static async connect(sequelize?: Sequelize): Promise<Sequelize> {
    const databaseConfig: Options = {
      dialect: "postgres",
      database: env.DB_NAME,
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      host: env.DB_HOST,
      port: parseInt(env.DB_PORT),
      define: {
        underscored: true,
      },
    };
    this.client = sequelize ? sequelize : new Sequelize(databaseConfig);
    return this.client;
  }

  static async disconnect(): Promise<void> {
    await this.client.close();
    this.client = null;
  }

  static getClient(): Sequelize {
    return this.client;
  }
}
