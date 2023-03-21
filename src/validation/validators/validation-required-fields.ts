import { MissingParamError } from "../../errors/missing-param-error";
import { Validation } from "../../presentation/protocols/validation";

export class ValidationRequiredFields implements Validation {
  private readonly fieldName: string;

  constructor(fieldName: string) {
    this.fieldName = fieldName;
  }

  async validate(input: any): Promise<Error> {
    if (Array.isArray(input)) {
      for (const valueOfInput of input) {
        if (!valueOfInput[this.fieldName]) {
          return new MissingParamError(this.fieldName);
        }
      }
    } else if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
  }
}
