import { ValidationComposite } from "../../application/helpers/validators/validation-composite";
import { RequiredFieldValidation } from "../../application/helpers/validators/required-field-validation";
import { Validation } from "../../application/helpers/validators/validation";

export const makeSigUpValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for(const field of ['name', 'email', 'password', 'passwordConfirmation']){
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}