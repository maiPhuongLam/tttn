import * as schema from './schemas';
import { Pool } from 'pg';

import { drizzle } from 'drizzle-orm/node-postgres';
import configuration from 'src/config/configuration';

const pool = new Pool({ connectionString: configuration.DB_URL });
export const DB = drizzle(pool, { schema });
