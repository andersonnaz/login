import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
    async hash(): Promise<string> {
        return new Promise(resolve => resolve('hash'))
    },

    async compare(): Promise<boolean> {
        return new Promise(resolve => resolve(true))
    }
}))

interface SutTypes {
    sut: BcryptAdapter,
    fakeSalt: number
}

const makeSut = (): SutTypes => {
    const fakeSalt: number = 12
    const sut = new BcryptAdapter(fakeSalt)
    return {
        fakeSalt,
        sut
    }
}

describe('Bcrypt Adapter', () => {
    test('should call hash with correct values', async () => {
        const { sut, fakeSalt} = makeSut()
        const hashSpy = jest.spyOn(bcrypt, 'hash')
        await sut.hash('any_value')
        expect(hashSpy).toHaveBeenCalledWith('any_value', fakeSalt)
    });

    test('should return a valid hash on hash success', async () => {
        const { sut } = makeSut()
        const hash = await sut.hash('any_value')
        expect(hash).toBe('hash')
    });

    test('should throw if hash throws', async () => {
        const { sut } = makeSut()
        jest.spyOn(bcrypt, 'hash').mockImplementation(() => { throw new Error() })
        const promise = sut.hash('any_value')
        await expect(promise).rejects.toThrow()
    });

    test('should call compare with correct values', async () => {
        const { sut } = makeSut()
        const compareSpy = jest.spyOn(bcrypt, 'compare')
        await sut.compare('any_value', 'any_hash')
        expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
    });

    test('should return true when a compare succeeds', async () => {
        const { sut } = makeSut()
        const isValid = await sut.compare('any_value', 'any_hash')
        expect(isValid).toBe(true)
    });

    test('should return false when a compare fails', async () => {
        const { sut } = makeSut()
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never)
        const isValid = await sut.compare('any_value', 'any_hash')
        expect(isValid).toBe(false)
    });

    test('should throw if compare throws', async () => {
        const { sut } = makeSut()
        jest.spyOn(bcrypt, 'compare').mockImplementation(() => { throw new Error() })
        const promise = sut.compare('any_value', 'any_hash')
        await expect(promise).rejects.toThrow()
    });
});