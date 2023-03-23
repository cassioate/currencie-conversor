import { currenciesConvertPath } from "./paths/currencies/convert-path";
import { currenciesSavePath } from "./paths/currencies/currencies-save";
import { currenciesSaveResponse } from "./schemas/currencies/response/currencies-save-response";
import { errorSchema } from "./schemas/errors/error-schema";
import { currenciesSaveBody } from "./schemas/currencies/body/currencies-save-body";
import { badRequest } from "./components/errors/bad-request";
import { internalServer } from "./components/errors/internal-server";
import { currenciesConvertResponse } from "./schemas/currencies/response/currencies-convert-response";

export default {
  openapi: "3.0.0",
  info: {
    title: "Currencies-API",
    description: "API para realizar conversão de moedas",
    version: "1.0.0",
  },
  servers: [
    {
      url: "/api",
    },
  ],
  tags: [
    {
      name: "Currencies",
    },
  ],
  paths: {
    "/convert/{currency}/{value}": currenciesConvertPath,
    "/save/currencies": currenciesSavePath,
  },
  schemas: {
    // currencies Save
    currenciesSaveBody: currenciesSaveBody,
    currenciesSaveResponse: currenciesSaveResponse,

    // currencies Convert
    currenciesConvertResponse: currenciesConvertResponse,

    // errors
    error: errorSchema,
  },
  components: {
    badRequest,
    internalServer,
  },
};
