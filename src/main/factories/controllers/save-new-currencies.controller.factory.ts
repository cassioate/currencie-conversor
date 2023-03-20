import { SaveNewCurrenciesController } from "../../../presentation/controllers/save-new-currencies.controller";
import { Controller } from "../../../presentation/protocols";
import { makeSaveNewCurrenciesUseCase } from "../usecases/save-new-currencies.usecase.factory";

export const makeSaveNewCurrenciesController = (): Controller => {
  const controller = new SaveNewCurrenciesController(
    makeSaveNewCurrenciesUseCase()
  );
  return controller;
};
