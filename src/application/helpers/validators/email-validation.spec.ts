import { EmailValidation } from './email-validation'
import { InvalidParamError, ServerError } from '../../errors'
import { EmailValidator } from '../../protocols/email-validator'

const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid(email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

interface SutTypes {
    sut: EmailValidation,
    emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
    const emailValidatorStub = makeEmailValidator()
    const sut = new EmailValidation('email', emailValidatorStub)
    return {
        emailValidatorStub,
        sut
    }
}

describe('Email Validation', () => {
    test('Should return an error if EmailValidator returns false' , async () => {
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
        const error = await sut.validate({ email: 'any_email@mail.com' })
        expect(error).toEqual(new InvalidParamError('email'))
    })

    test('Should call EmailValidator with correct email' , () => {
        const { sut, emailValidatorStub } = makeSut()
        const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
        sut.validate({ email: 'any_email@mail.com' })
        expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
    })

    test('Should throw if an EmailValidator throws', async () => {
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
            throw new Error()
        })
        expect(sut.validate).toThrow()
    })

})

