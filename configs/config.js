const config = {
    mongodb: {
        url: process.env.MONGODB_URL || 'mongodb://localhost:27017',
        dbName: process.env.MONGODB_DB_NAME || 'myproject',
    },
    JWT: {
        SECRET: '123', // 要和簽發時一樣，所以可以放在 ./configs/config.js 中
    }
}
module.exports = config;