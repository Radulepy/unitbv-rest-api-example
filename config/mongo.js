const { MongoClient } = require('mongodb');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const MONGO_DB = process.env.MONGO_DB || 'todo_db';

let client;
let db;

function ensureMongoDb(callback) {
  if (db) return callback(null, db);

  if (!client) {
    client = new MongoClient(MONGO_URI);
  }

  client
    .connect()
    .then(() => {
      db = client.db(MONGO_DB);
      console.log('[Mongo] Connected', { uri: MONGO_URI, db: MONGO_DB });
      callback(null, db);
    })
    .catch((err) => callback(err));
}

module.exports = {
  ensureMongoDb,
};
