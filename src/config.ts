import { config } from 'dotenv';

config();
export const MONGODB_URL = process.env.MONGODB_URI;
export const MONGO_DEBUG = true;
