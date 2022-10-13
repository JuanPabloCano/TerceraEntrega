import mongoose from "mongoose";

export default class MongoConfig {

  static init(connectionString, base) {
    mongoose.connect(connectionString)
            .then(() => console.log(`Mongo database connection established successfully at ${ base }`))
            .catch(error => console.log({ error }));
  }
}