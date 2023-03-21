import { SaveNewCurrencies } from "../../domain/usecases/save-new-currencies.usecase";
import { BadRequestError } from "../../errors/bad-request";
import {
  GetAllAcceptedCurrenciesRepository,
  SaveNewCurrenciesRepository,
} from "../protocols/db";

import { AxiosInstanceInterface } from "../protocols/axios/axios-instance";

export class SaveNewCurrenciesUseCase implements SaveNewCurrencies {
  constructor(
    private readonly saveNewCurrenciesRepository: SaveNewCurrenciesRepository,
    private readonly getAllAcceptedCurrenciesRepository: GetAllAcceptedCurrenciesRepository,
    private readonly axiosInstance: AxiosInstanceInterface,
    private readonly localCurrency: string
  ) {}

  save = async (
    currencies: AcceptedCurrencyModel[]
  ): Promise<AcceptedCurrencyModel[]> => {
    await this.validateCurrenciesThatAreAlreadyInDatabase(currencies);
    await this.validateExistenceOfCurrency(currencies);
    const result = await this.saveNewCurrenciesRepository.save(currencies);
    return result;
  };

  private validateExistenceOfCurrency = async (
    currencies: AcceptedCurrencyModel[]
  ): Promise<void> => {
    const mappedToString = currencies.map((item) => {
      return item.currency;
    });

    let currenciesToString = mappedToString.join(`-${this.localCurrency},`);
    currenciesToString = currenciesToString.concat(`-${this.localCurrency}`);

    try {
      await this.axiosInstance.api().get(`/${currenciesToString}`);
    } catch (err) {
      throw new BadRequestError(err.response.data.message);
    }
  };

  private validateCurrenciesThatAreAlreadyInDatabase = async (
    currencies: AcceptedCurrencyModel[]
  ): Promise<void> => {
    const verifyAcceptedCurrencies =
      await this.getAllAcceptedCurrenciesRepository.getAll();

    const mappedAcceptedCurrenciesToBeComparable = verifyAcceptedCurrencies.map(
      (item) => {
        return item.currency;
      }
    );

    const repeatedCurrencies = currencies
      .filter((item) =>
        mappedAcceptedCurrenciesToBeComparable.includes(item.currency)
      )
      .map((item) => item.currency);

    if (repeatedCurrencies.length) {
      throw new BadRequestError(
        `The currencies (${repeatedCurrencies}) are already in the database!`
      );
    }
  };
}
