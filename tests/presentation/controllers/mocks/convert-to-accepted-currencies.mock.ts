import { ConvertToAcceptedCurrencies } from "../../../../src/domain/usecases";
import { mockCurrencyPaginationModel } from "../../../models/mocks/currencies-models.mock";

export const makeConvertToAcceptedCurrenciesStub =
  (): ConvertToAcceptedCurrencies => {
    class ConvertToAcceptedCurrenciesStub
      implements ConvertToAcceptedCurrencies
    {
      convert = async (
        currencyModel: CurrencyModel,
        page?: number,
        size?: number
      ): Promise<CurrencyPaginationModel> => {
        return mockCurrencyPaginationModel;
      };
    }
    return new ConvertToAcceptedCurrenciesStub();
  };
