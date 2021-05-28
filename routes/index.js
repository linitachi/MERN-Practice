var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/sayHi', function (req, res, next) {
  res.send('hi');
});

const MongoClient = require('mongodb').MongoClient;

// index.js 執行就建立連線
const url = 'mongodb://localhost:27017';
const dbName = 'myproject';
const client = new MongoClient(url, { useNewUrlParser: true });
client.connect()
  .then((connectedClient) => {
    console.log('mongodb is connected');
  })
  .catch(error => {
    console.error(error);
  });

router.get('/api/mongo', function (req, res, next) {
  res.json({
    isConnected: client.isConnected(),
  });
});

router.post('/api/echo', function (req, res, next) {
  const body = req.body;

  // 寫入 MongoDb
  const worker = (async function (data) {
    const db = client.db(dbName);
    const collection = db.collection('echo');
    const result = await collection.insertOne(data);
    console.log(result);
    return result;
  })(body);

  // 回應
  worker.then(() => {
    res.json(body);
  })
    .catch(next); // 發生 error 的話，next() 交給之後的 middleware 處理，express 有預設的處理方法
});

module.exports = router;


