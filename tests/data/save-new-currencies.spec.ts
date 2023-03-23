import { AxiosInstance } from "axios";
import { AxiosInstanceInterface } from "../../src/data/protocols/axios/axios-instance-protocols";
import {
  GetAllAcceptedCurrenciesRepository,
  SaveNewCurrenciesRepository,
} from "../../src/data/protocols/db";
import { SaveNewCurrenciesUseCase } from "../../src/data/usecases";
import { mockArrayOfAcceptedCurrency } from "../models/mocks/currencies-models.mock";
import {
  makeAxiosInstanceInterfaceStub,
  makeGetAllAcceptedCurrenciesRepositoryStub,
  makeSaveNewCurrenciesRepositoryStub,
} from "./mock/save-new-currencies.mock";

interface SutType {
  sut: SaveNewCurrenciesUseCase;
  saveNewCurrenciesRepository: SaveNewCurrenciesRepository;
  getAllAcceptedCurrenciesRepository: GetAllAcceptedCurrenciesRepository;
  axiosInstance: AxiosInstanceInterface;
  localCurrency: string;
  alternativeCurrency: string;
}

const makeSut = (): SutType => {
  const saveNewCurrenciesRepository = makeSaveNewCurrenciesRepositoryStub();
  const getAllAcceptedCurrenciesRepository =
    makeGetAllAcceptedCurrenciesRepositoryStub();
  const axiosInstance = makeAxiosInstanceInterfaceStub();
  const localCurrency = "BTC";
  const alternativeCurrency = "USD";
  const sut = new SaveNewCurrenciesUseCase(
    saveNewCurrenciesRepository,
    getAllAcceptedCurrenciesRepository,
    axiosInstance,
    localCurrency,
    alternativeCurrency
  );
  return {
    sut,
    saveNewCurrenciesRepository,
    getAllAcceptedCurrenciesRepository,
    axiosInstance,
    localCurrency,
    alternativeCurrency,
  };
};

describe("GIVEN SaveNewCurrenciesUseCase", () => {
  describe("WHEN save is called", () => {
    test("THEN should throw a message about the currencies that already exist in the database", async () => {
      const { sut } = makeSut();
      const result = sut.save(mockArrayOfAcceptedCurrency);
      await expect(result).rejects.toThrow(
        "BadRequest: The currencies (ZAR,BRL) are already in the database!"
      );
    });

    test("THEN should return a object the type of AcceptedCurrencyModel as array", async () => {
      const { sut } = makeSut();
      const result = await sut.save([{ currency: "USD" }]);
      expect(result).toEqual(mockArrayOfAcceptedCurrency);
    });

    describe("AND localCurrency is equal to requested currency, so use the alternative currency", () => {
      test("THEN should return a object the type of AcceptedCurrencyModel as array", async () => {
        let { sut, localCurrency } = makeSut();
        const result = await sut.save([{ currency: localCurrency }]);
        expect(result).toEqual(mockArrayOfAcceptedCurrency);
      });
    });

    test("THEN should throw because of axios throws", async () => {
      const { sut, axiosInstance } = makeSut();
      jest.spyOn(axiosInstance, "api").mockImplementationOnce(() => {
        return {
          get: () => {
            throw new Error();
          },
        } as unknown as AxiosInstance;
      });
      const result = sut.save([{ currency: "USD" }]);
      await expect(result).rejects.toThrow(
        "Cannot read properties of undefined (reading 'data')"
      );
    });
  });
});
