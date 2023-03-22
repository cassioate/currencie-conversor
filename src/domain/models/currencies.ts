interface CurrencyModel {
  currency: string;
  value: number;
}

interface CurrencyPaginationModel {
  currencies: CurrencyModel[];
  totalOfPages: number;
}

interface AcceptedCurrencyModel {
  currency: string;
}

interface AcceptedCurrencyPaginationModel {
  rows: AcceptedCurrencyModel[];
  count: number;
}
