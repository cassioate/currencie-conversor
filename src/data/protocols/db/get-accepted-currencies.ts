export interface GetAllAcceptedCurrenciesRepository {
  getAll: (
    page?: number,
    size?: number
  ) => Promise<AcceptedCurrencyPaginationModel>;
}
