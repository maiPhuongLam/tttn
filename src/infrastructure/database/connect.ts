import * as schema from './schemas';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import configuration from 'src/config/configuration';

// const pool = new Pool({ connectionString: configuration.DB_URL });
const sql = neon(configuration.DB_URL);

export const DB = drizzle(sql);
