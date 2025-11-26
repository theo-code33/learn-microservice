import 'dotenv/config';
import path from 'path';
import { DataSource } from 'typeorm';
import { Review } from './reviews/entities/review.entity';

// DataSource utilisé par le CLI TypeORM pour exécuter les migrations.
// Il lit les variables d'environnement depuis le .env (via dotenv/config).
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME || process.env.POSTGRES_USER || 'user',
  password:
    process.env.DB_PASSWORD || process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.DB_NAME || process.env.POSTGRES_DB || 'v3_bordeaux',
  entities: [Review],
  migrations: [path.join(__dirname, 'migrations/*.{ts,js}')],
  synchronize: false,
});

export default AppDataSource;
