import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';
config();
export default defineConfig({
  schema: './src/infrastructure/database/schemas/*.ts',
  out: './src/infrastructure/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL!,
  },
  verbose: true,
  strict: true,
});
