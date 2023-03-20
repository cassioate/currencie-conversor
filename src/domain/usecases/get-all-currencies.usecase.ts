export interface GetAllCurrencies {
  getAll: (currencyModel: CurrencyModel) => Promise<CurrencyModel[]>;
}
