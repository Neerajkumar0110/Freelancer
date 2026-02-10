import 'dotenv/config'; // Essential for local development
import { defineConfig, env } from 'prisma/config';


export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),
  },
});