import {
  ConvertToAcceptedCurrencies,
  SaveNewCurrencies,
} from "../../../src/domain/usecases";
import { MissingParamError } from "../../../src/errors/missing-param-error";
import {
  ConvertToAcceptedCurrenciesController,
  SaveNewCurrenciesController,
} from "../../../src/presentation/controllers";
import { Validation } from "../../../src/presentation/protocols/validation";
import { ValidationComposite } from "../../../src/validation/validators/validation-composite";
import { makeRequiredFieldsValidation } from "../../validation/mocks/required-fields-validation.mock";
import { makeConvertToAcceptedCurrenciesStub } from "./mocks/convert-to-accepted-currencies.mock";
import {
  mockCurrencyPaginationModel,
  mockHttpRequestWithConvertParams,
} from "../../models/mocks/currencies-models.mock";
interface SutType {
  sut: ConvertToAcceptedCurrenciesController;
  convertToAcceptedCurrencies: ConvertToAcceptedCurrencies;
}

const makeSut = (): SutType => {
  const convertToAcceptedCurrencies = makeConvertToAcceptedCurrenciesStub();
  const sut = new ConvertToAcceptedCurrenciesController(
    convertToAcceptedCurrencies
  );
  return {
    sut,
    convertToAcceptedCurrencies,
  };
};

describe("GIVEN SaveNewCurrenciesController", () => {
  describe("WHEN handle is called", () => {
    test("THEN should return a currency with pagination value in the body", async () => {
      const { sut } = makeSut();
      const result = await sut.handle(mockHttpRequestWithConvertParams);
      expect(result.body).toEqual(mockCurrencyPaginationModel);
    });

    test("THEN should return a a message of error if convert throws", async () => {
      const { sut, convertToAcceptedCurrencies } = makeSut();
      jest
        .spyOn(convertToAcceptedCurrencies, "convert")
        .mockImplementationOnce(() => {
          throw new Error("convertToAcceptedCurrenciesError");
        });
      const result = await sut.handle(mockHttpRequestWithConvertParams);
      expect(result.body.message).toEqual("convertToAcceptedCurrenciesError");
    });
  });
});
