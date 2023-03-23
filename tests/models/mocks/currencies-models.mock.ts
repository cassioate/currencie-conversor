import { AcceptedCurrencies } from "../../../src/db/sequelize/models/accepted-currencies.model";
import {
  ConvertParams,
  HttpRequest,
  QueryParams,
} from "../../../src/presentation/protocols";

export const mockArrayOfAcceptedCurrency: AcceptedCurrencyModel[] = [
  { currency: "ZAR" },
  { currency: "BRL" },
];

export const mockCurrencyModelWith2Decimals: CurrencyModel = {
  currency: "BRL",
  value: 100.11,
};

export const mockCurrencyModel: CurrencyModel = {
  currency: "ZAR",
  value: 500.555,
};

export const mockCurrencyModelWithOtherValue: CurrencyModel = {
  currency: "BRL",
  value: 5,
};

export const mockApiCurrenciesResponse: ExternalCurrencyModel[] = [
  {
    code: "BRL",
    high: "5",
  },
];

export const mockCurrencyPaginationModelWith2Decimals: CurrencyPaginationModel =
  {
    currencies: [mockCurrencyModelWith2Decimals],
    totalOfPages: 1,
  };

export const mockCurrencyPaginationModel: CurrencyPaginationModel = {
  currencies: [mockCurrencyModelWithOtherValue],
  totalOfPages: 1,
};

export const mockQueryParamsModel: QueryParams = {
  page: 0,
  size: 1,
};

export const mockAcceptedCurrenciesPaginationModel: AcceptedCurrencyPaginationModel =
  {
    rows: mockArrayOfAcceptedCurrency,
    count: 2,
  };

export const mockAcceptedCurrenciesPaginationModelAsAcceptedCurrency = {
  rows: [{ currency: "ZAR" }, { currency: "ZAR" }],
  count: 2,
};

export const mockHttpRequestWithConvertParams: HttpRequest<ConvertParams> = {
  params: mockCurrencyModel,
  headers: {},
  body: {},
  query: mockQueryParamsModel,
};
