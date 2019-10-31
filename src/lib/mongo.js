const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoConnect {
  constructor() {
   
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
    this.dbName = DB_NAME;
  }

   connect() {
    if (!MongoClient.connection) {
      MongoClient.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            reject(err);
          }
          console.log('Connected succesfully to mongo 1111');
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoClient.connection;
  }
 
  getAll(collection, query) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .find(query)
        .toArray();
    });
  }

  create(collection, data)
  {
   
    return this.connect().then(db => {
        return db.collection(collection).insertOne(data);
    }).then(result => result.insertedId);
  }

  update(collection, id, data){
    return this.connect().then(db => {
      return db.collection(collection).updateOne({_id:ObjectId(id)},{$set:data},{upsert:true})
    }).then(result => result.updatedId || id);
  }

  delete(collection, id)
  {
    return this.connect().then(db => {
      return db.collection(collection).deleteOne({_id:ObjectId(id)})
    }).then(()=> id);
  }
}

module.exports = MongoConnect;
