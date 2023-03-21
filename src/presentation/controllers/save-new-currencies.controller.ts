import { SaveNewCurrencies } from "../../domain/usecases/save-new-currencies.usecase";
import { httpOk, httpError } from "../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../protocols";
import { Validation } from "../protocols/validation";

export class SaveNewCurrenciesController implements Controller {
  constructor(
    private readonly saveNewCurrencies: SaveNewCurrencies,
    private readonly validation: Validation
  ) {}

  handle = async (httpRequest: HttpRequest): Promise<HttpResponse> => {
    try {
      const error = await this.validation.validate(httpRequest.body);
      if (error) {
        return httpError(error, 400);
      }
      const result = await this.saveNewCurrencies.save(httpRequest.body);
      return httpOk(result);
    } catch (err) {
      return httpError(err, err.statusCode);
    }
  };
}
