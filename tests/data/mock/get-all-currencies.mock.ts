import { GetAllCurrencies } from "../../../src/domain/usecases";
import { mockCurrencyPaginationModel } from "../../models/mocks/currencies-models.mock";

export const makeGetAllCurrenciesStub = (): GetAllCurrencies => {
  class GetAllCurrenciesStub implements GetAllCurrencies {
    getAll = async (
      _currencyModel: CurrencyModel,
      _page: number,
      _size: number
    ): Promise<CurrencyPaginationModel> => {
      return mockCurrencyPaginationModel;
    };
  }
  return new GetAllCurrenciesStub();
};
