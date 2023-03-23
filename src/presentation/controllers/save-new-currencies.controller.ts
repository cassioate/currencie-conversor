import { SaveNewCurrencies } from "../../domain/usecases/save-new-currencies.usecase";
import { customerLogger } from "../../main/config/logger";
import { httpOk, httpError } from "../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../protocols";
import { Validation } from "../protocols/validation";

export class SaveNewCurrenciesController implements Controller {
  constructor(
    private readonly saveNewCurrencies: SaveNewCurrencies,
    private readonly validation: Validation
  ) {}

  handle = async (httpRequest: HttpRequest): Promise<HttpResponse> => {
    customerLogger.info("Saving new currencies");
    try {
      const error = await this.validation.validate(httpRequest.body);
      if (error) {
        return httpError(error, 400);
      }
      const result = await this.saveNewCurrencies.save(httpRequest.body);
      customerLogger.info("Currencies are saved");
      return httpOk(result);
    } catch (err) {
      customerLogger.error(err.message);
      return httpError(err, err.statusCode);
    }
  };
}
