import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import logger from '../logger';
import configuration from '../../config/configuration';
import path from 'path';
// migrate db
const runMigration = async () => {
  try {
    logger.info('migration start');
    const pool = new Pool({ connectionString: configuration.DB_URL });
    const db = drizzle(pool);
    await migrate(db, {
      migrationsFolder: path.resolve(__dirname, 'migrations'),
    });
    logger.info('migration succcessfully');
    pool.end();
  } catch (error) {
    logger.error(error);
  }
};

runMigration();
