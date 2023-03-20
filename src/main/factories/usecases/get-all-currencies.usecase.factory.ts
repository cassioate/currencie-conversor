import { GetAllCurrenciesUseCase } from "../../../data/usecases/get-all-currencies";
import { GetAllCurrencies } from "../../../domain/usecases/get-all-currencies.usecase";
import { AxiosAwesomeApi } from "../../../infra/axios/awesome-api";
import { CurrenciesRepository } from "../../../infra/repository/currencies.repository";
import env from "../../config/env";

export const makeGetAllCurrencies = (): GetAllCurrencies => {
  const getAllAcceptedCurrenciesRepository = new CurrenciesRepository();
  const axiosInstance = new AxiosAwesomeApi(env.API_CURRENCY);
  const useCase = new GetAllCurrenciesUseCase(
    getAllAcceptedCurrenciesRepository,
    axiosInstance
  );
  return useCase;
};
