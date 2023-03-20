export interface SaveNewCurrenciesRepository {
  save: (currencies: CurrencyModelInput) => Promise<AcceptedCurrencyModel[]>;
}
