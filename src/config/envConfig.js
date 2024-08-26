import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT || 3003;
export const mongoUri = process.env.MONGO_URI;
export const dbName = process.env.DB_NAME;
export const totpCollection = process.env.TOTP_COLLECTION;
