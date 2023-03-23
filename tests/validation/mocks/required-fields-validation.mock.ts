import { MissingParamError } from "../../../src/errors/missing-param-error";
import { Validation } from "../../../src/presentation/protocols/validation";

export const makeRequiredFieldsValidation = (): Validation => {
  class RequiredFieldsValidationStub implements Validation {
    validate = async (input: any): Promise<Error> => {
      return new MissingParamError("fieldName");
    };
  }
  return new RequiredFieldsValidationStub();
};
