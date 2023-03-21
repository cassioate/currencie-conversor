import { SaveNewCurrenciesController } from "../../../presentation/controllers/save-new-currencies.controller";
import { Controller } from "../../../presentation/protocols";
import { makeSaveNewCurrenciesUseCase } from "../usecases/save-new-currencies.usecase.factory";
import { makeSaveNewCurrenciesComposite } from "../validation/validators/save-new-currencies.validator.factory ";

export const makeSaveNewCurrenciesController = (): Controller => {
  const controller = new SaveNewCurrenciesController(
    makeSaveNewCurrenciesUseCase(),
    makeSaveNewCurrenciesComposite()
  );
  return controller;
};
