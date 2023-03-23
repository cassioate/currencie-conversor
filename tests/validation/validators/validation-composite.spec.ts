import { MissingParamError } from "../../../src/errors/missing-param-error";
import { Validation } from "../../../src/presentation/protocols/validation";
import { ValidationComposite } from "../../../src/validation/validators/validation-composite";
import { makeRequiredFieldsValidation } from "../mocks/required-fields-validation.mock";

interface SutType {
  sut: ValidationComposite;
  requiredFieldsValidation: Validation;
}

const makeSut = (): SutType => {
  const requiredFieldsValidation = makeRequiredFieldsValidation();
  const sut = new ValidationComposite([requiredFieldsValidation]);
  return {
    sut,
    requiredFieldsValidation,
  };
};

describe("GIVEN ValidationComposite", () => {
  describe("WHEN validate is called", () => {
    test("THEN should return MissingParamError from requiredFieldsValidation if the validation was provided", async () => {
      const { sut } = makeSut();
      const result = await sut.validate({});
      expect(result.message).toEqual(
        new MissingParamError("fieldName").message
      );
    });

    test("THEN should return undefined if validation no return erros", async () => {
      const { sut, requiredFieldsValidation } = makeSut();
      jest
        .spyOn(requiredFieldsValidation, "validate")
        .mockImplementationOnce(() => {
          return undefined;
        });
      const result = await sut.validate({});
      expect(result).toEqual(undefined);
    });
  });
});
