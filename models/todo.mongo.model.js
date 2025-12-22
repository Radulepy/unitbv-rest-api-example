const { ObjectId } = require('mongodb');
const { ensureMongoDb } = require('../config/mongo');

const COLLECTION = 'todos';

const TodoMongo = {
  create: (title, callback) => {
    ensureMongoDb((err, db) => {
      if (err) return callback(err);

      db.collection(COLLECTION)
        .insertOne({ title, completed: false, createdAt: new Date() })
        .then((result) => callback(null, { insertedId: result.insertedId.toString() }))
        .catch((e) => callback(e));
    });
  },

  getAll: (callback) => {
    ensureMongoDb((err, db) => {
      if (err) return callback(err);

      db.collection(COLLECTION)
        .find({})
        .sort({ _id: -1 })
        .toArray()
        .then((docs) => {
          const mapped = docs.map((d) => ({
            id: d._id?.toString(),
            title: d.title,
            completed: !!d.completed,
          }));
          callback(null, mapped);
        })
        .catch((e) => callback(e));
    });
  },

  delete: (id, callback) => {
    ensureMongoDb((err, db) => {
      if (err) return callback(err);

      let _id;
      try {
        _id = new ObjectId(id);
      } catch {
        return callback(new Error('Invalid Mongo ObjectId'));
      }

      db.collection(COLLECTION)
        .deleteOne({ _id })
        .then((result) => callback(null, result))
        .catch((e) => callback(e));
    });
  },
};

module.exports = TodoMongo;
