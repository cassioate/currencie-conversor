import { ConvertToAcceptedCurrenciesUseCase } from "../../../data/usecases/convert-to-accepted-currencies";
import { ConvertToAcceptedCurrencies } from "../../../domain/usecases/convert-to-accepted-currencies.usecase";
import { makeGetAllCurrencies } from "./get-all-currencies.usecase.factory";

export const makeConvertToAcceptedCurrenciesUseCase =
  (): ConvertToAcceptedCurrencies => {
    const getAllCurrencies = makeGetAllCurrencies();
    const useCase = new ConvertToAcceptedCurrenciesUseCase(getAllCurrencies);
    return useCase;
  };
