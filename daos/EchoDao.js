class EchoDao {
    /**
     * @param {object} config
     * @param {MongoClient} mongoClient
     */
    constructor({ config, mongoClient }) {
        this.config = config;
        this.mongoClient = mongoClient;
        this.dbName = this.config.mongodb.dbName;
    }

    async insert(data) {
        const db = this.mongoClient.db(this.dbName);
        const collection = db.collection('echo');
        return await collection.insertOne(data);
    }
    async find() {
        const db = this.mongoClient.db(this.dbName);
        const collection = db.collection('echo');
        return await collection.find().toArray();
    }
    async delete(data) {
        const db = this.mongoClient.db(this.dbName);
        const collection = db.collection('echo');
        return await collection.deleteOne(data);
    }
}


module.exports = EchoDao;
