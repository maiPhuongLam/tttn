import * as schema from './schemas';
import { Pool } from 'pg';
// import { neon } from '@neondatabase/serverless';
import { drizzle } from "drizzle-orm/node-postgres";
import configuration from 'src/config/configuration';
const sql = new Pool({ connectionString: configuration.DB_URL })


export const DB = drizzle(sql, { schema });
