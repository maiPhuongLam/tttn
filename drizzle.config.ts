import { defineConfig } from 'drizzle-kit';
import configuration from 'src/config/configuration';

export default defineConfig({
  schema: './src/infrastructure/database/schemas/*.ts',
  out: './src/infrastructure/database/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: configuration.DB_URL,
  },
  verbose: true,
  strict: true,
});
