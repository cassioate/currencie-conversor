import { ConvertToAcceptedCurrencies } from "../../domain/usecases/convert-to-accepted-currencies.usecase";
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
    try {
      const result = await this.convertToAcceptedCurrencies.convert({
        currency: httpRequest.params.currency,
        value: httpRequest.params.value,
      });
      return httpOk(result);
    } catch (err) {
      return httpError(err, err.statusCode);
    }
  };
}
