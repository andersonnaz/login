import request from "supertest";
import app from "../config/app";
import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helper";
import env from '../config/env'

describe('Signup Routes', () => {
    beforeAll(async () => {
        await MongoHelper.connect(env.mongoUrl)
    })
 
    afterAll(async () => {
        await MongoHelper.disconnect()
    })
 
    beforeEach(async () => {
        const accountCollection = await MongoHelper.getCollection('accounts')
        await accountCollection.deleteMany({})
    })
    
    test('should return an account on success', async () => {
        await request(app)
            .post('/api/signup')
            .send({
                name: 'any_name',
                email: 'any_email@mail.com',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            })
            .expect(200)
    });
});