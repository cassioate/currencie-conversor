export interface SaveNewCurrencies {
  save: (
    currencies: AcceptedCurrencyModel[]
  ) => Promise<AcceptedCurrencyModel[]>;
}
