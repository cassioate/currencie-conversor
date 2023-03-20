import { ConvertToAcceptedCurrenciesController } from "../../../presentation/controllers/convert-to-accepted-currencies.controller";
import { Controller } from "../../../presentation/protocols";
import { makeConvertToAcceptedCurrenciesUseCase } from "../usecases/convert-to-accepted-currencies.usecase.factory";

export const makeConvertToAcceptedCurrenciesControllerController =
  (): Controller => {
    const controller = new ConvertToAcceptedCurrenciesController(
      makeConvertToAcceptedCurrenciesUseCase()
    );
    return controller;
  };
