interface CurrencyModel {
  currency: string;
  value: number;
}

interface CurrencyModelInput {
  values: AcceptedCurrencyModel[];
}

interface AcceptedCurrencyModel {
  currency: string;
}
