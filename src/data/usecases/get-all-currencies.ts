import { GetAllCurrencies } from "../../domain/usecases/get-all-currencies.usecase";
import { AxiosInstanceInterface } from "../protocols/axios/axios-instance";
import { GetAllAcceptedCurrenciesRepository } from "../protocols/db";

export class GetAllCurrenciesUseCase implements GetAllCurrencies {
  constructor(
    private readonly getAllAcceptedCurrenciesRepository: GetAllAcceptedCurrenciesRepository,
    private readonly axiosInstance: AxiosInstanceInterface
  ) {}

  getAll = async (currencyModel: CurrencyModel): Promise<CurrencyModel[]> => {
    const acceptedCurrencies =
      await this.getAllAcceptedCurrenciesRepository.getAll();

    const pathURL = this.createStringToThePath(
      acceptedCurrencies,
      currencyModel
    );

    const result = await this.axiosInstance.api().get(`/${pathURL}`);
    const mappedResult = this.createArrayFromTheDataResult(result);
    return mappedResult;
  };

  private createStringToThePath = (
    acceptedCurrencies: AcceptedCurrencyModel[],
    currencyModel: CurrencyModel
  ) => {
    const mappedTheCurrency = acceptedCurrencies
      .map((item) => {
        return item.currency;
      })
      .filter((currency) => currency !== currencyModel.currency);

    let currenciesToString = mappedTheCurrency.join(
      `-${currencyModel.currency},`
    );
    return currenciesToString.concat(`-${currencyModel.currency}`);
  };

  private createArrayFromTheDataResult = (response: any): CurrencyModel[] => {
    const map = new Map(Object.entries(response.data));
    const array: CurrencyModel[] = [];

    map.forEach((item: ExternalCurrencyModel) => {
      const obj: CurrencyModel = {
        currency: item.code,
        value: parseFloat(item.high),
      };
      array.push(obj);
    });

    return array;
  };
}
