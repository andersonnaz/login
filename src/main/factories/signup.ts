import { SignUpController } from "../../application/controllers/signup/signup";
import { Controller } from "../../application/protocols";
import { DbAddAccount } from "../../data/usecases/add-account/db-add-account";
import { BcryptAdapter } from "../../infra/criptography/bcrypt-adapter";
import { AccountMongoRepository } from "../../infra/db/mongodb/account-repository/account";
import { LogMongoRepository } from "../../infra/db/mongodb/log-repository/log";
import { LogControllerDecorator } from "../decorators/log";
import { makeSigUpValidation } from "./signup-validation";

export const makeSignUpController = (): Controller => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const addAccountMongoRepository = new AccountMongoRepository()
    const dbAddAccount = new DbAddAccount(bcryptAdapter, addAccountMongoRepository)
    const signUpController = new SignUpController(dbAddAccount, makeSigUpValidation())
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(signUpController, logMongoRepository)
}