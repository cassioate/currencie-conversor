import { Sequelize } from "sequelize";
import { SequelizeHelper } from "../../../src/db/helpers/sequelize-helper";
import { AcceptedCurrencies } from "../../../src/db/sequelize/models/accepted-currencies.model";
import { CurrenciesRepository } from "../../../src/infra/repository/currencies.repository";
import {
  mockAcceptedCurrenciesPaginationModelAsAcceptedCurrency,
  mockArrayOfAcceptedCurrency,
} from "../../models/mocks/currencies-models.mock";

interface SutType {
  sut: CurrenciesRepository;
}

const makeSut = (): SutType => {
  const sut = new CurrenciesRepository();
  return {
    sut,
  };
};

describe("GIVEN CurrenciesRepository", () => {
  beforeEach(() => {
    const sequelize = new Sequelize("database", "username", "password", {
      host: "localhost",
      dialect: "postgres",
    });
    SequelizeHelper.connect(sequelize);
  });
  describe("WHEN save is called", () => {
    test("THEN should return the currencies that are accept", async () => {
      const { sut } = makeSut();
      jest
        .spyOn(AcceptedCurrencies, "bulkCreate")
        .mockImplementationOnce(async () => {
          return mockArrayOfAcceptedCurrency as unknown as AcceptedCurrencies[];
        });
      const result = await sut.save(mockArrayOfAcceptedCurrency);
      expect(result).toEqual(mockArrayOfAcceptedCurrency);
    });

    test("THEN should throws if bulkCreate throws", async () => {
      const { sut } = makeSut();
      jest
        .spyOn(AcceptedCurrencies, "bulkCreate")
        .mockImplementationOnce(async () => {
          throw new Error("BulkCreateThrows");
        });
      const result = sut.save(mockArrayOfAcceptedCurrency);
      await expect(result).rejects.toThrow("BulkCreateThrows");
    });
  });

  describe("WHEN getAll is called", () => {
    test("THEN should return a rows of currencies with pagination value in the body", async () => {
      const { sut } = makeSut();
      jest
        .spyOn(AcceptedCurrencies, "count")
        .mockImplementationOnce(async () => {
          return 2;
        });
      jest
        .spyOn(AcceptedCurrencies, "findAndCountAll")
        .mockImplementationOnce(async () => {
          return mockAcceptedCurrenciesPaginationModelAsAcceptedCurrency as any;
        });
      const result = await sut.getAll();
      expect(result).toEqual(
        mockAcceptedCurrenciesPaginationModelAsAcceptedCurrency
      );
    });

    describe("AND Page/Size is passed", () => {
      test("THEN should return a row of currencies with pagination value in the body", async () => {
        const { sut } = makeSut();
        jest
          .spyOn(AcceptedCurrencies, "count")
          .mockImplementationOnce(async () => {
            return 2;
          });
        jest
          .spyOn(AcceptedCurrencies, "findAndCountAll")
          .mockImplementationOnce(async () => {
            return mockAcceptedCurrenciesPaginationModelAsAcceptedCurrency as any;
          });
        const result = await sut.getAll(0, 2);
        expect(result).toEqual(
          mockAcceptedCurrenciesPaginationModelAsAcceptedCurrency
        );
      });
    });
  });
});
