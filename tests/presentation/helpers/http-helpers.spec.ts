import {
  httpError,
  httpOk,
} from "../../../src/presentation/helpers/http-helper";
import {
  ErrorBody,
  StatusCode200body,
} from "../../models/mocks/http-helpers-models.mock";

describe("GIVEN Http helper", () => {
  describe("WHEN httpError is called", () => {
    test("THEN should return a httpResponse type with statusCode 400 and correct body", async () => {
      const result = httpError(ErrorBody, 400);
      expect(result).toEqual({
        statusCode: 400,
        body: ErrorBody,
      });
    });

    test("THEN should return a httpResponse type with statusCode 500 and correct body", async () => {
      const result = httpError(ErrorBody);
      expect(result).toEqual({
        statusCode: 500,
        body: ErrorBody,
      });
    });
  });

  describe("WHEN httpOk is called", () => {
    test("THEN should return a httpResponse type with statusCode 200 and correct body", async () => {
      const result = httpOk(StatusCode200body);
      expect(result).toEqual({
        statusCode: 200,
        body: StatusCode200body,
      });
    });
  });
});
