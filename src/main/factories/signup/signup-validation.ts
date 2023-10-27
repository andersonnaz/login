import { ValidationComposite, RequiredFieldValidation, EmailValidation } from "../../../application/helpers/validators";
import { Validation } from "../../../application/protocols/validation";
import { CompareFieldValidation } from "../../../application/helpers/validators/compare-field-validation";
import { EmailValidatorAdapter } from "../../../utils/email-validator-adapter";

export const makeSigUpValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for(const field of ['name', 'email', 'password', 'passwordConfirmation']){
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    return new ValidationComposite(validations)
}