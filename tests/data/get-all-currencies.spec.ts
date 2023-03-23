import { AxiosInstance } from "axios";
import { AxiosInstanceInterface } from "../../src/data/protocols/axios/axios-instance-protocols";
import { GetAllAcceptedCurrenciesRepository } from "../../src/data/protocols/db";
import { GetAllCurrenciesUseCase } from "../../src/data/usecases";
import {
  mockCurrencyModel,
  mockCurrencyModelWithOtherValue,
  mockCurrencyPaginationModel,
} from "../models/mocks/currencies-models.mock";
import {
  makeAxiosInstanceInterfaceStub,
  makeGetAllAcceptedCurrenciesRepositoryStub,
} from "./mock/save-new-currencies.mock";

interface SutType {
  sut: GetAllCurrenciesUseCase;
  getAllAcceptedCurrenciesRepository: GetAllAcceptedCurrenciesRepository;
  axiosInstance: AxiosInstanceInterface;
}

const makeSut = (): SutType => {
  const getAllAcceptedCurrenciesRepository =
    makeGetAllAcceptedCurrenciesRepositoryStub();
  const axiosInstance = makeAxiosInstanceInterfaceStub();
  const sut = new GetAllCurrenciesUseCase(
    getAllAcceptedCurrenciesRepository,
    axiosInstance
  );
  return {
    sut,
    getAllAcceptedCurrenciesRepository,
    axiosInstance,
  };
};

describe("GIVEN GetAllCurrenciesUseCase", () => {
  describe("WHEN save is called", () => {
    test("THEN should return one array of currencies with pagination", async () => {
      const { sut } = makeSut();
      const result = await sut.getAll(mockCurrencyModel, 0, 2);
      expect(result).toEqual({
        currencies: [mockCurrencyModelWithOtherValue, mockCurrencyModel],
        totalOfPages: 1,
      });
    });

    test("THEN should return one array of currencies with pagination without using the page and size in the request", async () => {
      const { sut } = makeSut();
      const result = await sut.getAll(mockCurrencyModel);
      expect(result).toEqual({
        currencies: [mockCurrencyModelWithOtherValue, mockCurrencyModel],
        totalOfPages: 1,
      });
    });

    test("THEN should throw if getAll throws", async () => {
      const { sut, getAllAcceptedCurrenciesRepository } = makeSut();

      jest
        .spyOn(getAllAcceptedCurrenciesRepository, "getAll")
        .mockImplementationOnce(() => {
          throw new Error("getAllAcceptedCurrenciesRepository");
        });
      const result = sut.getAll(mockCurrencyModel, 0, 2);
      await expect(result).rejects.toThrow(
        "getAllAcceptedCurrenciesRepository"
      );
    });

    test("THEN should throw if axios throws", async () => {
      const { sut, axiosInstance } = makeSut();
      jest.spyOn(axiosInstance, "api").mockImplementationOnce(() => {
        throw new Error("axiosInstance");
      });
      const result = sut.getAll(mockCurrencyModel, 0, 2);
      await expect(result).rejects.toThrow("axiosInstance");
    });
  });
});
