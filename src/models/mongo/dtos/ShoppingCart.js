import mongoose from "mongoose";
import Config from '../../../config.js';
import MongoConfig from "../../../database/mongoDBConfig.js";

const { Schema, model } = mongoose;
const connectionString = Config.MONGO_DB_CONNECTION;
MongoConfig.init(connectionString, 'ShoppingCart');

const ShoppingCartSchema = new Schema({
    timestamp: {
        type: Date,
        required: true
    },
    products: { type: mongoose.Schema.Types.ObjectId, ref: ' product' }
});

export const ShoppingCart = model('shoppingCart', ShoppingCartSchema);

