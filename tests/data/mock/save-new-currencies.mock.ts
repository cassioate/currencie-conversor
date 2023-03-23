import { AxiosInstance } from "axios";
import { AxiosInstanceInterface } from "../../../src/data/protocols/axios/axios-instance-protocols";
import {
  GetAllAcceptedCurrenciesRepository,
  SaveNewCurrenciesRepository,
} from "../../../src/data/protocols/db";
import {
  mockAcceptedCurrenciesPaginationModel,
  mockApiCurrenciesResponse,
  mockArrayOfAcceptedCurrency,
} from "../../models/mocks/currencies-models.mock";

export const makeAxiosInstanceInterfaceStub = (): AxiosInstanceInterface => {
  class AxiosInstanceInterfaceStub implements AxiosInstanceInterface {
    api = (): AxiosInstance => {
      return new Api() as unknown as AxiosInstance;
    };
  }

  class Api {
    get = async () => {
      return { data: mockApiCurrenciesResponse };
    };
  }

  return new AxiosInstanceInterfaceStub();
};

export const makeGetAllAcceptedCurrenciesRepositoryStub =
  (): GetAllAcceptedCurrenciesRepository => {
    class GetAllAcceptedCurrenciesRepositoryStub
      implements GetAllAcceptedCurrenciesRepository
    {
      getAll = async (
        page?: number,
        size?: number
      ): Promise<AcceptedCurrencyPaginationModel> => {
        return mockAcceptedCurrenciesPaginationModel;
      };
    }

    return new GetAllAcceptedCurrenciesRepositoryStub();
  };

export const makeSaveNewCurrenciesRepositoryStub =
  (): SaveNewCurrenciesRepository => {
    class SaveNewCurrenciesRepositoryStub
      implements SaveNewCurrenciesRepository
    {
      save = async (
        currencies: AcceptedCurrencyModel[]
      ): Promise<AcceptedCurrencyModel[]> => {
        return mockArrayOfAcceptedCurrency;
      };
    }

    return new SaveNewCurrenciesRepositoryStub();
  };
