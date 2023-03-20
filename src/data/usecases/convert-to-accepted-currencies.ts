import { ConvertToAcceptedCurrencies } from "../../domain/usecases/convert-to-accepted-currencies.usecase";
import { GetAllCurrencies } from "../../domain/usecases/get-all-currencies.usecase";

export class ConvertToAcceptedCurrenciesUseCase
  implements ConvertToAcceptedCurrencies
{
  constructor(private readonly getAllCurrencies: GetAllCurrencies) {}

  convert = async (currencyModel: CurrencyModel): Promise<CurrencyModel[]> => {
    const allCurrencies = await this.getAllCurrencies.getAll(currencyModel);
    allCurrencies.forEach((item) => {
      item.value = currencyModel.value / item.value;
    });
    return allCurrencies;
  };
}
