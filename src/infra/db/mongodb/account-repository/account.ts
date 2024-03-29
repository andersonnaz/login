import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/use-cases/add-account';
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
       const accountCollection = await MongoHelper.getCollection('accounts')
       const result = await accountCollection.insertOne(accountData)
       const accountId = result.insertedId.id.toString()
       return Object.assign({}, accountData, {id: accountId})
    }
}