import { MongoHelper as sut} from "./mongo-helper";
import env from "../../../../main/config/env";

describe('Mongo helper', () => {
    beforeAll(async () => {
        await sut.connect(env.mongoUrl)
    })
 
    afterAll(async () => {
        await sut.disconnect()
    })
 
    beforeEach(async () => {
        const accountCollection = await sut.getCollection('accounts')
        await accountCollection.deleteMany({})
    })

    test('should reconnect if mongodb is down', async () => {
        let accountCollection = await sut.getCollection('accounts')
        expect(accountCollection).toBeTruthy()
        await sut.disconnect()
        accountCollection = await sut.getCollection('accounts')
        expect(accountCollection).toBeTruthy()
    });
});