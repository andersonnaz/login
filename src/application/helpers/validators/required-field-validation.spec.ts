import { MissingParamError } from "../../errors";
import { RequiredFieldValidation } from "./required-field-validation";

const makeSut = (): RequiredFieldValidation => {
    const sut = new RequiredFieldValidation('field')
    return sut
}

describe('RequiredField Validation', () => {
    test('should return a MissiangParamError if validation fails', () => {
        const sut = makeSut()
        const error = sut.validate({ name: 'any_name' })
        expect(error).toEqual(new MissingParamError('field'))
    });

    test('should not return if valisation succeeds', () => {
        const sut = makeSut()
        const error = sut.validate({ field: 'any_name' })
        expect(error).toBeFalsy()
    });
});