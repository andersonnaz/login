import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
    client: null as MongoClient,
    uri: null as string,

    async connect(uri: string): Promise<void> {
        this.uri = uri
        const mongoClient = await new MongoClient(uri)
        this.client = await mongoClient.connect()
    },

    async disconnect(): Promise<void>  {
        await this.client.close()
        this.client = null
    },

    async getCollection(name: string): Promise<Collection> {
        if(!this.client){
            await this.connect(this.uri)
        }
        return this.client.db().collection(name)
    }
}