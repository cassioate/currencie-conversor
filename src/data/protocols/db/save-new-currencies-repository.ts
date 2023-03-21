export interface SaveNewCurrenciesRepository {
  save: (
    currencies: AcceptedCurrencyModel[]
  ) => Promise<AcceptedCurrencyModel[]>;
}
