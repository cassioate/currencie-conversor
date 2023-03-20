export interface SaveNewCurrencies {
  save: (currencies: CurrencyModelInput) => Promise<AcceptedCurrencyModel[]>;
}
