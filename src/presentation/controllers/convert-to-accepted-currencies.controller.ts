import { ConvertToAcceptedCurrencies } from "../../domain/usecases/convert-to-accepted-currencies.usecase";
import { customerLogger } from "../../main/config/logger";
import { httpOk, httpError } from "../helpers/http-helper";
import {
  Controller,
  ConvertParams,
  HttpRequest,
  HttpResponse,
} from "../protocols";

export class ConvertToAcceptedCurrenciesController implements Controller {
  constructor(
    private readonly convertToAcceptedCurrencies: ConvertToAcceptedCurrencies
  ) {}

  handle = async (
    httpRequest: HttpRequest<ConvertParams>
  ): Promise<HttpResponse> => {
    customerLogger.info("Taking the conversion of coins");
    try {
      const { params, query } = httpRequest;
      const result = await this.convertToAcceptedCurrencies.convert(
        {
          currency: params.currency.toUpperCase(),
          value: params.value,
        },
        query.page,
        query.size
      );
      customerLogger.info("Coins was converted");
      return httpOk(result);
    } catch (err) {
      customerLogger.error(err.message);
      return httpError(err, err.statusCode);
    }
  };
}
