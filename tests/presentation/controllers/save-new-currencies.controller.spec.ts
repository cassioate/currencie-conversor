import { SaveNewCurrencies } from "../../../src/domain/usecases";
import { MissingParamError } from "../../../src/errors/missing-param-error";
import { SaveNewCurrenciesController } from "../../../src/presentation/controllers";
import { Validation } from "../../../src/presentation/protocols/validation";
import { ValidationComposite } from "../../../src/validation/validators/validation-composite";
import { makeRequiredFieldsValidation } from "../../validation/mocks/required-fields-validation.mock";
import { mockArrayOfAcceptedCurrency } from "../../models/mocks/currencies-models.mock";
import { makeSaveNewCurrenciesStub } from "./mocks/save-new-currencies.mock";

interface SutType {
  sut: SaveNewCurrenciesController;
  saveNewCurrencies: SaveNewCurrencies;
  validation: Validation;
}

const makeSut = (): SutType => {
  const validation = new ValidationComposite([makeRequiredFieldsValidation()]);
  const saveNewCurrencies = makeSaveNewCurrenciesStub();
  const sut = new SaveNewCurrenciesController(saveNewCurrencies, validation);
  return {
    sut,
    saveNewCurrencies,
    validation,
  };
};

describe("GIVEN SaveNewCurrenciesController", () => {
  describe("WHEN handle is called", () => {
    test("THEN should return a badRequestError after validate fails", async () => {
      const { sut } = makeSut();
      const result = await sut.handle({});
      expect(result.body.message).toEqual(
        new MissingParamError("fieldName").message
      );
    });

    test("THEN should return array of accepted currencies", async () => {
      const { sut, validation } = makeSut();
      jest.spyOn(validation, "validate").mockImplementationOnce(() => {
        return undefined;
      });
      const result = await sut.handle({});
      expect(result.body).toEqual(mockArrayOfAcceptedCurrency);
    });

    test("THEN should return one HttpError if save throws", async () => {
      const { sut, validation, saveNewCurrencies } = makeSut();
      jest.spyOn(validation, "validate").mockImplementationOnce(() => {
        return undefined;
      });
      jest.spyOn(saveNewCurrencies, "save").mockImplementationOnce(() => {
        throw new Error("httpError");
      });
      const result = await sut.handle({});
      expect(result.body.message).toEqual("httpError");
    });
  });
});
