import { SaveNewCurrenciesUseCase } from "../../../data/usecases/save-new-currencies";
import { SaveNewCurrencies } from "../../../domain/usecases/save-new-currencies.usecase";
import { AxiosAwesomeApi } from "../../../infra/axios/awesome-api";
import { CurrenciesRepository } from "../../../infra/repository/currencies.repository";
import env from "../../config/env";

export const makeSaveNewCurrenciesUseCase = (): SaveNewCurrencies => {
  const saveNewCurrenciesRepository = new CurrenciesRepository();
  const getAllAcceptedCurrenciesRepository = new CurrenciesRepository();
  const axiosInstance = new AxiosAwesomeApi(env.API_CURRENCY);
  const localCurrency = env.LOCAL_CURRENCY;
  const alternativeCurrency = env.ALTERNATIVE_CURRENCY;
  const useCase = new SaveNewCurrenciesUseCase(
    saveNewCurrenciesRepository,
    getAllAcceptedCurrenciesRepository,
    axiosInstance,
    localCurrency,
    alternativeCurrency
  );
  return useCase;
};
