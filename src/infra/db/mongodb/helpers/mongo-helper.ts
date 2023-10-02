import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
    client: null as MongoClient,

    async connect(): Promise<void> {
        const mongoClient = await new MongoClient(process.env.MONGO_URL)
        this.client = await mongoClient.connect()
    },

    async disconnect(): Promise<void>  {
        this.client.close()
    },

    async getCollection(name: string): Promise<Collection> {
        return this.client.db().collection(name)
    }
}