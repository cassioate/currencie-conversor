import {
  GetAllAcceptedCurrenciesRepository,
  SaveNewCurrenciesRepository,
} from "../../data/protocols/db";
import { AcceptedCurrencies } from "../../db/sequelize/models/accepted-currencies.model";

export class CurrenciesRepository
  implements SaveNewCurrenciesRepository, GetAllAcceptedCurrenciesRepository
{
  getAll = async (): Promise<AcceptedCurrencyModel[]> => {
    const result = await AcceptedCurrencies.findAll();
    return result as unknown as AcceptedCurrencyModel[];
  };

  save = async (
    currencies: CurrencyModelInput
  ): Promise<AcceptedCurrencyModel[]> => {
    const result = await AcceptedCurrencies.bulkCreate(currencies.values);
    return result as unknown as AcceptedCurrencyModel[];
  };
}
