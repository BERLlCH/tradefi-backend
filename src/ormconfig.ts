import { DataSource } from 'typeorm';
import env from './env';

const {
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  TYPEORM_LOGGING,
} = env;

const AppDataSource = new DataSource({
  type: 'postgres',
  host: TYPEORM_HOST,
  port: TYPEORM_PORT,
  database: TYPEORM_DATABASE,
  username: TYPEORM_USERNAME,
  password: TYPEORM_PASSWORD,
  logging: TYPEORM_LOGGING,
  entities:
    process.env.NODE_ENV === 'production'
      ? ['dist/models/*.js', 'dist/models/**/*.js']
      : ['src/models/*.ts', 'src/models/**/*.ts'],
  migrations:
    process.env.NODE_ENV === 'production' ? ['dist/migrations/*.js'] : ['src/migrations/*.ts'],
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

export default AppDataSource;
