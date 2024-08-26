import { MongoClient } from 'mongodb';
import { mongoUri, dbName } from './envConfig.js';

let db;

export const connectDB = async () => {
    if (db) return db;

    const client = new MongoClient(mongoUri); // Eliminar useNewUrlParser y useUnifiedTopology

    await client.connect();
    db = client.db(dbName);
    console.log(`Conectado a la base de datos: ${dbName}`);
    return db;
};

export const getDB = () => {
    if (!db) throw new Error('La base de datos no está conectada.');
    return db;
};
