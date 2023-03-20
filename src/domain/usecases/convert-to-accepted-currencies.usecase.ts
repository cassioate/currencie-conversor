export interface ConvertToAcceptedCurrencies {
  convert: (currencyModel: CurrencyModel) => Promise<CurrencyModel[]>;
}
