import { ConvertToAcceptedCurrencies } from "../../domain/usecases/convert-to-accepted-currencies.usecase";
import { GetAllCurrencies } from "../../domain/usecases/get-all-currencies.usecase";

export class ConvertToAcceptedCurrenciesUseCase
  implements ConvertToAcceptedCurrencies
{
  constructor(private readonly getAllCurrencies: GetAllCurrencies) {}

  convert = async (
    currencyModel: CurrencyModel,
    page?: number,
    size?: number
  ): Promise<CurrencyPaginationModel> => {
    const allCurrencies = await this.getAllCurrencies.getAll(
      currencyModel,
      page,
      size
    );
    allCurrencies.currencies.forEach((item) => {
      if (currencyModel.currency != item.currency) {
        const value = currencyModel.value / item.value;
        item.value = Number(Number(value).toFixed(2));
      }
    });
    return allCurrencies;
  };
}
