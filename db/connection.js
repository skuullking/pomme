import { Pool } from 'pg';
import 'dotenv/config';

// Créer une connexion à la base de données
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default pool;