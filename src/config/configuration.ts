import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'dev') {
  dotenv.config({ path: `.env.dev` });
} else {
  dotenv.config();
}

interface Config {
  TEST: string;
  BASE_URL?: string;
  PORT: string;
  DB_URL: string;
  JWT_ACCESS_SECRET_KEY?: string;
  JWT_REFRESH_SECRET_KEY?: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD: string;
  REDIS_URI: string;
  CLOUD_NAME: string;
  API_KEY: string;
  API_SECRET: string;
  FOLDER_PATH: string;
  PUBLIC_ID_PREFIX: string;
  BUCKET_NAME: string;
  REGION: string;
  S3_ACCESS_KEY: string;
  S3_SECRET_KEY: string;
}

const configuration: Config = {
  TEST: 'test',
  BASE_URL: process.env.BASE_URL,
  PORT: process.env.PORT!,
  DB_URL: process.env.DB_URL!,
  JWT_ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY: process.env.ACCESS_SECRET_KEY,
  REDIS_HOST: process.env.REDIS_HOST!,
  REDIS_PORT: +process.env.REDIS_PORT!,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD!,
  REDIS_URI: process.env.REDIS_URI!,
  CLOUD_NAME: process.env.CLOUD_NAME!,
  API_KEY: process.env.API_KEY!,
  API_SECRET: process.env.API_SECRET!,
  FOLDER_PATH: process.env.FOLDER_PATH!,
  PUBLIC_ID_PREFIX: process.env.PUBLIC_ID_PREFIX!,
  BUCKET_NAME: process.env.BUCKET_NAME!,
  REGION: process.env.REGION!,
  S3_ACCESS_KEY: process.env.S3_ACCESS_KEY!,
  S3_SECRET_KEY: process.env.S3_SECRET_KEY!,
};

export default configuration;
