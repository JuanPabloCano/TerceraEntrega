import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: `${ __dirname }/../environment/.env`
});

export default class Config {
    static MONGO_DB_CONNECTION = process.env.MONGO_DB_CONNECTION;
    static ACCOUNT_SID = process.env.ACCOUNT_SID;
    static AUTH_TOKEN = process.env.AUTH_TOKEN;
    static TEST_EMAIL = process.env.TEST_EMAIL;
    static PASSWORD = process.env.PASSWORD;
    static TIEMPO_EXPIRACION = process.env.TIEMPO_EXPIRACION;
}