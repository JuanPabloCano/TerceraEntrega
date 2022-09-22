import mongoose from "mongoose";
import Config from '../../config.js';
import MongoConfig from "../../database/mongoDBConfig.js";

const {Schema, model} = mongoose;
const connectionString = Config.MONGO_DB_CONNECTION;
MongoConfig.init(connectionString, 'user')

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String
})

export const User = model('user', UserSchema);