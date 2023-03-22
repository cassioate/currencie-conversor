export interface ConvertToAcceptedCurrencies {
  convert: (
    currencyModel: CurrencyModel,
    page?: number,
    size?: number
  ) => Promise<CurrencyPaginationModel>;
}
