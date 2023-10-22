import { CompareFieldValidation } from "../../application/helpers/validators/compare-field-validation";
import { RequiredFieldValidation } from "../../application/helpers/validators/required-field-validation";
import { Validation } from "../../application/helpers/validators/validation";
import { ValidationComposite } from "../../application/helpers/validators/validation-composite";
import { makeSigUpValidation } from "./signup-validation";

jest.mock('../../application/helpers/validators/validation-composite')

describe('SignUpValidation Factory', () => {
    test('should call ValidationComposite with all validations', () => {
        makeSigUpValidation()
        const validations: Validation[] = []
        for(const field of ['name', 'email', 'password', 'passwordConfirmation']){
            validations.push(new RequiredFieldValidation(field))
        }
        validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    });
});