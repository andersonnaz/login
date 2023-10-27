import { EmailValidator } from "../../../application/protocols/email-validator";
import { EmailValidation } from "../../../application/helpers/validators/email-validation";
import { RequiredFieldValidation } from "../../../application/helpers/validators/required-field-validation";
import { Validation } from "../../../application/helpers/validators/validation";
import { ValidationComposite } from "../../../application/helpers/validators/validation-composite";
import { makeLoginValidation } from "./login-validation";

jest.mock('../../../application/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid(email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}


describe('LoginValidation Factory', () => {
    test('should call ValidationComposite with all validations', () => {
        makeLoginValidation()
        const validations: Validation[] = []
        for(const field of ['email', 'password']){
            validations.push(new RequiredFieldValidation(field))
        }
        validations.push(new EmailValidation('email', makeEmailValidator()))
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    });
});