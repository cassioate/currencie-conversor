import {
  GetAllAcceptedCurrenciesRepository,
  SaveNewCurrenciesRepository,
} from "../../data/protocols/db";
import { AcceptedCurrencies } from "../../db/sequelize/models/accepted-currencies.model";

export class CurrenciesRepository
  implements SaveNewCurrenciesRepository, GetAllAcceptedCurrenciesRepository
{
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

    const result = await AcceptedCurrencies.findAndCountAll({
      limit: size,
      offset: page * size,
    });

    return result as unknown as AcceptedCurrencyPaginationModel;
  };

  save = async (
    currencies: AcceptedCurrencyModel[]
  ): Promise<AcceptedCurrencyModel[]> => {
    const result = await AcceptedCurrencies.bulkCreate(currencies);
    return result as unknown as AcceptedCurrencyModel[];
  };
}
