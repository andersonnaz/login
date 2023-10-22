import { ValidationComposite } from "../../application/helpers/validators/validation-composite";
import { RequiredFieldValidation } from "../../application/helpers/validators/required-field-validation";
import { Validation } from "../../application/helpers/validators/validation";
import { CompareFieldValidation } from "../../application/helpers/validators/compare-field-validation";

export const makeSigUpValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for(const field of ['name', 'email', 'password', 'passwordConfirmation']){
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    return new ValidationComposite(validations)
}