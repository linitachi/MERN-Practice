class EchoDao {
    /**
     * 
     * @param {MongoClient} mongoClient
     */
    constructor({ mongoClient }) {
        this.mongoClient = mongoClient;
    }

    async insert(data) {
        const dbName = 'myproject';
        const db = this.mongoClient.db(dbName);
        const collection = db.collection('echo');
        return await collection.insertOne(data);
    }
}

module.exports = EchoDao;
