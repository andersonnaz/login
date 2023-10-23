import { InvalidParamError } from "../../errors";
import { CompareFieldValidation } from "./compare-field-validation";

const makeSut = (): CompareFieldValidation => {
    const sut = new CompareFieldValidation('field', 'fieldToCompare')
    return sut
}

describe('RequiredField Validation', () => {
    test('should return a InvalidParamError if validation fails', () => {
        const sut = makeSut()
        const error = sut.validate({
            field: 'any_value',
            fieldToCompare: 'wrong_value',
        })
        expect(error).toEqual(new InvalidParamError('fieldToCompare'))
    });

    test('should not return if valisation succeeds', () => {
        const sut = makeSut()
        const error = sut.validate({
            field: 'any_value',
            fieldToCompare: 'any_value',
        })
        expect(error).toBeFalsy()
    });
});