import { Authentication, AuthenticationModel } from "../../../domain/use-cases/authentication";
import { LoadAccountByEmailRepository } from "../../protocols/db/load-account-By-Email-Repository";

export class DbAuthentication implements Authentication {
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository

    constructor(loadAccountByEmailRepository: LoadAccountByEmailRepository){
        this.loadAccountByEmailRepository = loadAccountByEmailRepository
    }

    async auth(authentication: AuthenticationModel): Promise<string> {
        await this.loadAccountByEmailRepository.load(authentication.email)
        return null
    }
}