import { EmailValidator } from "../../../application/protocols/email-validator";
import { CompareFieldValidation } from "../../../application/helpers/validators/compare-field-validation";
import { Validation } from "../../../application/protocols/validation";
import { ValidationComposite, RequiredFieldValidation, EmailValidation } from "../../../application/helpers/validators";
import { makeSigUpValidation } from "./signup-validation";

jest.mock('../../../application/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid(email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}


describe('SignUpValidation Factory', () => {
    test('should call ValidationComposite with all validations', () => {
        makeSigUpValidation()
        const validations: Validation[] = []
        for(const field of ['name', 'email', 'password', 'passwordConfirmation']){
            validations.push(new RequiredFieldValidation(field))
        }
        validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
        validations.push(new EmailValidation('email', makeEmailValidator()))
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    });
});