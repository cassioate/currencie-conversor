export interface GetAllCurrencies {
  getAll: (
    currencyModel: CurrencyModel,
    page: number,
    size: number
  ) => Promise<CurrencyPaginationModel>;
}
