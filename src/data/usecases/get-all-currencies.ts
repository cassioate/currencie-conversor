import { GetAllCurrencies } from "../../domain/usecases/get-all-currencies.usecase";
import { AxiosInstanceInterface } from "../protocols/axios/axios-instance-protocols";
import { GetAllAcceptedCurrenciesRepository } from "../protocols/db";

export class GetAllCurrenciesUseCase implements GetAllCurrencies {
  constructor(
    private readonly getAllAcceptedCurrenciesRepository: GetAllAcceptedCurrenciesRepository,
    private readonly axiosInstance: AxiosInstanceInterface
  ) {}

  getAll = async (
    currencyModel: CurrencyModel,
    page?: number,
    size?: number
  ): Promise<CurrencyPaginationModel> => {
    const acceptedCurrencies =
      await this.getAllAcceptedCurrenciesRepository.getAll(page, size);

    let arrayOfCurrenciesModel: CurrencyModel[] = [];
    if (acceptedCurrencies.rows.length) {
      const pathURL = this.createStringToThePath(
        acceptedCurrencies.rows,
        currencyModel
      );

      const result =
        pathURL && (await this.axiosInstance.api().get(`/${pathURL}`));

      arrayOfCurrenciesModel = this.createArrayFromTheDataResult(result);

      this.verifyIfNeedAddTheCurrentCurrency(
        currencyModel,
        acceptedCurrencies.rows,
        arrayOfCurrenciesModel
      );
    }

    return {
      currencies: arrayOfCurrenciesModel,
      totalOfPages: Math.ceil(
        acceptedCurrencies.count / (size ? size : acceptedCurrencies.count)
      ),
    };
  };

  private createStringToThePath = (
    acceptedCurrencies: AcceptedCurrencyModel[],
    currencyModel: CurrencyModel
  ): string => {
    const currenciesCode = this.takeCurrenciesCodeOfAcceptedCurrencies(
      acceptedCurrencies,
      currencyModel
    );

    return this.concatStringsWithComparableCurrency(
      currenciesCode,
      currencyModel
    );
  };

  private takeCurrenciesCodeOfAcceptedCurrencies = (
    acceptedCurrencies: AcceptedCurrencyModel[],
    currencyModel: CurrencyModel
  ): string[] => {
    const currenciesCode = acceptedCurrencies
      .map((item) => {
        return item.currency;
      })
      .filter((currency) => currency !== currencyModel.currency);
    return currenciesCode;
  };

  private concatStringsWithComparableCurrency = (
    currenciesCode: string[],
    currencyModel: CurrencyModel
  ): string => {
    if (currenciesCode.length) {
      let currenciesToString = currenciesCode.join(
        `-${currencyModel.currency},`
      );
      return currenciesToString.concat(`-${currencyModel.currency}`);
    }
  };

  private createArrayFromTheDataResult = (response: {
    data: ExternalCurrencyModel;
  }): CurrencyModel[] => {
    const arrayOfCurrencies: CurrencyModel[] = [];
    if (response) {
      const makeAMapOfCurrencies = new Map(Object.entries(response.data));
      this.convertCurrenciesToArray(makeAMapOfCurrencies, arrayOfCurrencies);
    }

    return arrayOfCurrencies;
  };

  private convertCurrenciesToArray = (
    mapOfCurrencies: Map<string, any>,
    arrayOfCurrencies: CurrencyModel[]
  ): void => {
    mapOfCurrencies.forEach((item: ExternalCurrencyModel) => {
      const obj: CurrencyModel = {
        currency: item.code,
        value: parseFloat(item.high),
      };
      arrayOfCurrencies.push(obj);
    });
  };

  private verifyIfNeedAddTheCurrentCurrency = (
    currencyModel: CurrencyModel,
    rows: AcceptedCurrencyModel[],
    arrayToBeUsed: CurrencyModel[]
  ): void => {
    if (
      rows.filter((item) => item.currency === currencyModel.currency).length
    ) {
      this.addCurrentCurrencyInTheArray(currencyModel, arrayToBeUsed);
    }
  };

  private addCurrentCurrencyInTheArray = (
    currencyModel: CurrencyModel,
    arrayOfCurrencies: CurrencyModel[]
  ): void => {
    arrayOfCurrencies.push({
      currency: currencyModel.currency,
      value: parseFloat(currencyModel.value.toString()),
    });
  };
}
