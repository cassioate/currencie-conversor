import { ConvertToAcceptedCurrenciesUseCase } from "../../src/data/usecases";
import { GetAllCurrencies } from "../../src/domain/usecases";
import {
  mockCurrencyModel,
  mockCurrencyPaginationModelWith2Decimals,
} from "../models/mocks/currencies-models.mock";
import { makeGetAllCurrenciesStub } from "./mock/get-all-currencies.mock";

interface SutType {
  sut: ConvertToAcceptedCurrenciesUseCase;
  getAllCurrencies: GetAllCurrencies;
}

const makeSut = (): SutType => {
  const getAllCurrencies = makeGetAllCurrenciesStub();
  const sut = new ConvertToAcceptedCurrenciesUseCase(getAllCurrencies);
  return {
    sut,
    getAllCurrencies,
  };
};

describe("GIVEN ConvertToAcceptedCurrenciesUseCase", () => {
  describe("WHEN convert is called", () => {
    test("THEN should return a object the type of CurrencyPaginationModel with max of 2 decimals", async () => {
      const { sut } = makeSut();
      const result = await sut.convert(mockCurrencyModel);
      expect(result).toEqual(mockCurrencyPaginationModelWith2Decimals);
    });

    test("THEN should throw if getAll throws", async () => {
      const { sut, getAllCurrencies } = makeSut();
      jest.spyOn(getAllCurrencies, "getAll").mockImplementationOnce(() => {
        throw new Error("ErrorGetAll");
      });
      const result = sut.convert(mockCurrencyModel);
      await expect(result).rejects.toThrow("ErrorGetAll");
    });
  });
});
