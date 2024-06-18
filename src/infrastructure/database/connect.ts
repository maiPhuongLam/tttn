import * as schema from './schemas';
import { Pool } from 'pg';

import { drizzle } from 'drizzle-orm/node-postgres';

const pool = new Pool({ connectionString: process.env.DB_URI });

export const DB = drizzle(pool, { schema });
