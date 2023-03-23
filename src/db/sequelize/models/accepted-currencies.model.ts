import { DataTypes, Model, Sequelize } from "sequelize";
import { SequelizeHelper } from "../../helpers/sequelize-helper";

export class AcceptedCurrencies extends Model<
  AcceptedCurrencyModel,
  AcceptedCurrencyModel
> {
  init(sequelize: Sequelize) {
    AcceptedCurrencies.init(
      {
        currency: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
        },
      },
      {
        sequelize: SequelizeHelper.getClient(),
        timestamps: false,
        underscored: true,
        schema: "public",
        tableName: "accepted_currencies",
      }
    );
  }

  associate() {}
}
