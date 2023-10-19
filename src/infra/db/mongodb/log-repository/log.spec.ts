import { Collection } from "mongodb";
import env from "../../../../main/config/env";
import { MongoHelper } from "../helpers/mongo-helper";
import { LogMongoRepository } from "./log";

describe('Log Mongo Repository', () => {
    let errorCollection: Collection

    beforeAll(async () => {
        await MongoHelper.connect(env.mongoUrl)
    })
 
    afterAll(async () => {
        await MongoHelper.disconnect()
    })
 
    beforeEach(async () => {
        errorCollection = await MongoHelper.getCollection('errors')
        await errorCollection.deleteMany({})
    })
    
    test('Should create an errorLog on success', async () => {
        const sut = new LogMongoRepository()
        await sut.logError('any_error')
        const count = await errorCollection.countDocuments()
        expect(count).toBe(1)
    });
});