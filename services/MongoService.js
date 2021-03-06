class MongoService {
    /**
     * 
     * @param {MongoClient} mongoClient
     * @param {EchoDao} echoDao
     */
    constructor({ mongoClient, echoDao }) {
        this.mongoClient = mongoClient;
        this.echoDao = echoDao;
    }

    /**
     * 
     * @returns Promise<bool>
     */
    isConnected() {
        return Promise.resolve(this.mongoClient.isConnected())
    }

    /**
     * 
     * @param {*} data 
     * @returns Promise
     */
    async insertEcho(data) {
        return this.echoDao.insert(data);
    }

    async findEcho() {
        return this.echoDao.find();
    }
    async deleteEcho() {
        return this.echoDao.delete();
    }
}

module.exports = MongoService;
