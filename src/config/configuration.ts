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
}

const configuration: Config = {
  TEST: 'test',
  BASE_URL: process.env.BASE_URL,
  PORT: process.env.PORT!,
  DB_URL: process.env.DB_URL!,
  JWT_ACCESS_SECRET_KEY: process.env.JWT_ACCESS_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
  REDIS_HOST: process.env.REDIS_HOST!,
  REDIS_PORT: +process.env.REDIS_PORT!,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD!,
  REDIS_URI: process.env.REDIS_URI!,
};

export default configuration;
