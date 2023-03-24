import {
  GetAllAcceptedCurrenciesRepository,
  SaveNewCurrenciesRepository,
} from "../../data/protocols/db";
import { SequelizeHelper } from "../../db/helpers/sequelize-helper";
import { AcceptedCurrencies } from "../../db/sequelize/models/accepted-currencies.model";

export class CurrenciesRepository
  implements SaveNewCurrenciesRepository, GetAllAcceptedCurrenciesRepository
{
  constructor() {
    AcceptedCurrencies.prototype.init(SequelizeHelper.getClient());
  }

  getAll = async (
    page?: number,
    size?: number
  ): Promise<AcceptedCurrencyPaginationModel> => {
    if (page === undefined) {
      page = 0;
    }
    if (size === undefined) {
      size = await AcceptedCurrencies.count();
    }

    const result =
      await AcceptedCurrencies.findAndCountAll<AcceptedCurrencies>();

    return result as unknown as AcceptedCurrencyPaginationModel;
  };

  save = async (
    currencies: AcceptedCurrencyModel[]
  ): Promise<AcceptedCurrencyModel[]> => {
    const result = await AcceptedCurrencies.bulkCreate(currencies);
    return result as unknown as AcceptedCurrencyModel[];
  };
}
