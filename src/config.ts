import { config } from 'dotenv';

config();

export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME as string;
export const AWS_ACCESS_KEY = 'AKIAWZYISU5UAMKFHION';
export const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
export const AWS_SECRET_ACCESS_KEY = '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';
export const AWS_ARN = process.env.AWS_ARN;
export const MONGODB_URL = process.env.MONGODB_URI;
export const MONGO_DEBUG = true;
