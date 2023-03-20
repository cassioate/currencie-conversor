export interface GetAllAcceptedCurrenciesRepository {
  getAll: () => Promise<AcceptedCurrencyModel[]>;
}
