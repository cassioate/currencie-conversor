import { SaveNewCurrencies } from "../../domain/usecases/save-new-currencies.usecase";
import { httpOk, httpError } from "../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class SaveNewCurrenciesController implements Controller {
  constructor(private readonly saveNewCurrencies: SaveNewCurrencies) {}

  handle = async (httpRequest: HttpRequest): Promise<HttpResponse> => {
    try {
      const result = await this.saveNewCurrencies.save(httpRequest.body);
      return httpOk(result);
    } catch (err) {
      return httpError(err, err.statusCode);
    }
  };
}
