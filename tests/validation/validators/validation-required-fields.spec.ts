import { MissingParamError } from "../../../src/errors/missing-param-error";
import { ValidationRequiredFields } from "../../../src/validation/validators/validation-required-fields";

describe("GIVEN ValidationRequiredFields", () => {
  describe("WHEN validate is called", () => {
    test("THEN should return MissingParamError if no currency is provided", async () => {
      const sut = new ValidationRequiredFields("currency");
      const newFakeBody = { currency: null };
      const result = await sut.validate(newFakeBody);
      expect(result.message).toEqual(new MissingParamError("currency").message);
    });

    test("THEN should return undefined if all fields are corrected passed", async () => {
      const sut = new ValidationRequiredFields("currency");
      const newFakeBody = { currency: "BRL" };
      const result = await sut.validate(newFakeBody);
      expect(result).toEqual(undefined);
    });

    test("THEN should return MissingParamError if no currency is provided inside of objects in the array", async () => {
      const sut = new ValidationRequiredFields("currency");
      const newFakeBody = [{}];
      const result = await sut.validate(newFakeBody);
      expect(result.message).toEqual(new MissingParamError("currency").message);
    });

    test("THEN should return undefined if all fields are corrected passed inside a array", async () => {
      const sut = new ValidationRequiredFields("currency");
      const newFakeBody = [{ currency: "BRL" }];
      const result = await sut.validate(newFakeBody);
      expect(result).toEqual(undefined);
    });
  });
});
