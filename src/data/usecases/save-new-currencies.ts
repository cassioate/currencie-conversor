import { SaveNewCurrencies } from "../../domain/usecases/save-new-currencies.usecase";
import { BadRequestError } from "../../errors/bad-request-error";
import {
  GetAllAcceptedCurrenciesRepository,
  SaveNewCurrenciesRepository,
} from "../protocols/db";

import { AxiosInstanceInterface } from "../protocols/axios/axios-instance-protocols";

export class SaveNewCurrenciesUseCase implements SaveNewCurrencies {
  constructor(
    private readonly saveNewCurrenciesRepository: SaveNewCurrenciesRepository,
    private readonly getAllAcceptedCurrenciesRepository: GetAllAcceptedCurrenciesRepository,
    private readonly axiosInstance: AxiosInstanceInterface,
    private readonly localCurrency: string,
    private readonly alternativeCurrency: string
  ) {}

  save = async (
    currencies: AcceptedCurrencyModel[]
  ): Promise<AcceptedCurrencyModel[]> => {
    await this.validateCurrenciesThatAreAlreadyInDatabase(currencies);
    await this.validateExistenceOfCurrency(currencies);
    const toUpperCase = await this.transformTheCurrenciesToUpperCase(
      currencies
    );
    const result = await this.saveNewCurrenciesRepository.save(toUpperCase);
    return result;
  };

  private validateCurrenciesThatAreAlreadyInDatabase = async (
    currencies: AcceptedCurrencyModel[]
  ): Promise<void> => {
    const verifyAcceptedCurrencies =
      await this.getAllAcceptedCurrenciesRepository.getAll();

    const mappedAcceptedCurrenciesToBeComparable =
      verifyAcceptedCurrencies.rows.map((item) => {
        return item.currency;
      });

    this.throwsIfCurrenciesAreAlreadyInTheDatabase(
      currencies,
      mappedAcceptedCurrenciesToBeComparable
    );
  };

  private throwsIfCurrenciesAreAlreadyInTheDatabase = (
    currencies: AcceptedCurrencyModel[],
    mappedAcceptedCurrenciesToBeComparable: string[]
  ): void => {
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

  private transformTheCurrenciesToUpperCase = async (
    currencies: AcceptedCurrencyModel[]
  ): Promise<AcceptedCurrencyModel[]> => {
    return currencies.map((item) => {
      return { currency: item.currency.toUpperCase() };
    });
  };

  private validateExistenceOfCurrency = async (
    currencies: AcceptedCurrencyModel[]
  ): Promise<void> => {
    const mappedToUpperCaseString = currencies.map((item) => {
      return item.currency.toUpperCase();
    });

    if (mappedToUpperCaseString.length) {
      const pathURL = this.concatStringsWithLocalOrAlternativeCurrency(
        mappedToUpperCaseString
      );

      try {
        await this.axiosInstance.api().get(`/${pathURL}`);
      } catch (err) {
        throw new BadRequestError(err.response.data.message);
      }
    }
  };

  private concatStringsWithLocalOrAlternativeCurrency = (
    currenciesCode: string[]
  ): string => {
    return currenciesCode
      .map((item) => {
        if (item.toUpperCase() !== this.localCurrency.toUpperCase()) {
          return item.concat(`-${this.localCurrency}`).toUpperCase();
        } else {
          return item.concat(`-${this.alternativeCurrency}`).toUpperCase();
        }
      })
      .join();
  };
}
