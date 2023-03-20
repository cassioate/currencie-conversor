import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeConvertToAcceptedCurrenciesControllerController } from "../factories/controllers/convert-to-accepted-currencies.controller.factory";
import { makeSaveNewCurrenciesController } from "../factories/controllers/save-new-currencies.controller.factory";

export default (router: Router): void => {
  router.get(
    "/api/convert/:currency/:value",
    adaptRoute(makeConvertToAcceptedCurrenciesControllerController())
  );
  router.post(
    "/api/save/currencies",
    adaptRoute(makeSaveNewCurrenciesController())
  );
};
