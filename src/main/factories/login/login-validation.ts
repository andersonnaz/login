import { ValidationComposite } from "../../../application/helpers/validators/validation-composite";
import { RequiredFieldValidation } from "../../../application/helpers/validators/required-field-validation";
import { Validation } from "../../../application/helpers/validators/validation";
import { EmailValidation } from "../../../application/helpers/validators/email-validation";
import { EmailValidatorAdapter } from "../../../utils/email-validator-adapter";

export const makeLoginValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for(const field of ['email', 'password']){
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    return new ValidationComposite(validations)
}