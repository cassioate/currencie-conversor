import { Validation } from "../../../../presentation/protocols/validation";
import { ValidationComposite } from "../../../../validation/validators/validation-composite";
import { ValidationRequiredFields } from "../../../../validation/validators/validation-required-fields";

export const makeSaveNewCurrenciesComposite = (): Validation => {
  const validations: Validation[] = [];
  const fields = ["currency"];
  for (const field of fields) {
    validations.push(new ValidationRequiredFields(field));
  }
  return new ValidationComposite(validations);
};
