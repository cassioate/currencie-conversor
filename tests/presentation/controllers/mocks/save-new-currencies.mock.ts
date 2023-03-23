import { SaveNewCurrencies } from "../../../../src/domain/usecases";
import { mockArrayOfAcceptedCurrency } from "../../../models/mocks/currencies-models.mock";

export const makeSaveNewCurrenciesStub = (): SaveNewCurrencies => {
  class SaveNewCurrenciesStub implements SaveNewCurrencies {
    save = async (
      _currencies: AcceptedCurrencyModel[]
    ): Promise<AcceptedCurrencyModel[]> => {
      return mockArrayOfAcceptedCurrency;
    };
  }
  return new SaveNewCurrenciesStub();
};
