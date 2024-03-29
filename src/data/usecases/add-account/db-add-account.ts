import { Hasher, AddAccount, AddAccountModel, AccountModel, AddAccountRepository } from "../../usecases/add-account/db-add-account-protocols";

export class DbAddAccount implements AddAccount {
    private readonly hasher: Hasher
    private readonly addAccountRepository: AddAccountRepository

    constructor(hasher: Hasher, addAccountRepository: AddAccountRepository){
        this.hasher = hasher
        this.addAccountRepository = addAccountRepository
    }

    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const hashedPassword = await this.hasher.hash(accountData.password)
        const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
        return new Promise(resolve => resolve(account))
    }
}