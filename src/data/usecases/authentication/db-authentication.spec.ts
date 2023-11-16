import { AccountModel } from "../add-account/db-add-account-protocols";
import { LoadAccountByEmailRepository } from "../../protocols/db/load-account-By-Email-Repository";
import { DbAuthentication } from "./db-authentication";
import { AuthenticationModel } from "../../../domain/use-cases/authentication";
import { HashComparer } from "../../protocols/criptography/hash-comparer";
import { TokenGenerator } from "../../protocols/criptography/token-generator";
import { UpdateAccessTokenRepository } from "../../protocols/db/update-access-token-repository";

const makeFakeAccount = (): AccountModel => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_email',
    password: 'hashed_password'
})

const makeFakeAuthentication = (): AuthenticationModel => ({
    email: 'any_email@mail.com',
    password: 'any_password'
})

const makeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
    class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
        async update(id: string, token: string): Promise<void> {
            return new Promise(resolve => resolve())
        }
    }
    return new UpdateAccessTokenRepositoryStub()
}

const makeTokenGenerator = (): TokenGenerator => {
    class TokenGeneratorStub implements TokenGenerator {
        async generate(id: string): Promise<string> {
            return new Promise(resolve => resolve('any_token'))
        }
    }
    return new TokenGeneratorStub()
}

const makeHashComparer = (): HashComparer => {
    class HashComparerStub implements HashComparer {
        async compare(value: string, hash: string): Promise<Boolean> {
            return new Promise(resolve => resolve(true))
        }
    }
    return new HashComparerStub()
}

const makeLoadAccountByEmailRepositoryStub = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
        async load(email: string): Promise<AccountModel> {
            const account: AccountModel = makeFakeAccount()
            return new Promise(resolve => resolve(account))
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

interface SutTypes {
    sut: DbAuthentication,
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository,
    hashComparerStub: HashComparer,
    tokenGeneratorStub: TokenGenerator,
    updateAccessTokeRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
    const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepositoryStub()
    const hashComparerStub = makeHashComparer()
    const tokenGeneratorStub = makeTokenGenerator()
    const updateAccessTokeRepositoryStub = makeUpdateAccessTokenRepository()
    const sut = new DbAuthentication(
        loadAccountByEmailRepositoryStub,
        hashComparerStub,
        tokenGeneratorStub,
        updateAccessTokeRepositoryStub)
    return {
        sut,
        loadAccountByEmailRepositoryStub,
        hashComparerStub,
        tokenGeneratorStub,
        updateAccessTokeRepositoryStub
    }
}

describe('DbAuthentication UseCase', () => {
    test('should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
        await sut.auth(makeFakeAuthentication())
        expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
    });

    test('should throw if LoadAccountByEmailRepository throws', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.auth(makeFakeAuthentication())
        await expect(promise).rejects.toThrow()
    });

    test('should return null if LoadAccountByEmailRepository returns null', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(null)
        const accessToken = await sut.auth(makeFakeAuthentication())
        expect(accessToken).toBe(null)
    });

    test('should call HashComparer with correct values', async () => {
        const { sut, hashComparerStub } = makeSut()
        const compareSpy = jest.spyOn(hashComparerStub, 'compare')
        await sut.auth(makeFakeAuthentication())
        expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
    });

    test('should throw if HashComparer throws', async () => {
        const { sut, hashComparerStub } = makeSut()
        jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.auth(makeFakeAuthentication())
        await expect(promise).rejects.toThrow()
    });

    test('should return null if HashComparer returns false', async () => {
        const { sut, hashComparerStub } = makeSut()
        jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)))
        const accessToken = await sut.auth(makeFakeAuthentication())
        expect(accessToken).toBe(null)
    });

    test('should return TokenGenerator with correct id', async () => {
        const { sut, tokenGeneratorStub } = makeSut()
        const tokenSpy = jest.spyOn(tokenGeneratorStub, 'generate')
        await sut.auth(makeFakeAuthentication())
        expect(tokenSpy).toHaveBeenCalledWith('any_id')
    });

    test('should throw if TokenGenerator throws', async () => {
        const { sut, tokenGeneratorStub } = makeSut()
        jest.spyOn(tokenGeneratorStub, 'generate').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.auth(makeFakeAuthentication())
        await expect(promise).rejects.toThrow()
    });

    test('should return a token on success', async () => {
        const { sut } = makeSut()
        const accessToken = await sut.auth(makeFakeAuthentication())
        expect(accessToken).toBe('any_token')
    });

    test('should call UpdateAccessTokeRepository with correct values', async () => {
        const { sut, updateAccessTokeRepositoryStub } = makeSut()
        const updateSpy = jest.spyOn(updateAccessTokeRepositoryStub, 'update')
        await sut.auth(makeFakeAuthentication())
        expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
    });

    test('should throw if UpdateAccessTokeRepository throws', async () => {
        const { sut, updateAccessTokeRepositoryStub } = makeSut()
        jest.spyOn(updateAccessTokeRepositoryStub, 'update').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.auth(makeFakeAuthentication())
        await expect(promise).rejects.toThrow()
    });
});