import mongoose from "mongoose";
import Config from '../../../config.js';
import MongoConfig from "../../../database/mongoDBConfig.js";

const { Schema, model } = mongoose;
const connectionString = Config.MONGO_DB_CONNECTION;
MongoConfig.init(connectionString, 'Product');

const ProductSchema = new Schema({
  timestamp: {
    type: Date,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  code: {
    type: Number,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  }
});

export const Product = model('product', ProductSchema);

