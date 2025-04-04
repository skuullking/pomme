import { Pool } from "pg"
import bcrypt from "bcryptjs"

// Créer un pool de connexions à la base de données
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

async function initUsersTable() {
  try {
    console.log("Initialisation de la table des utilisateurs...")

    // Créer la table users si elle n'existe pas
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Créer un utilisateur de démonstration
    const hashedPassword = await bcrypt.hash("password123", 10)

    // Vérifier si l'utilisateur de démonstration existe déjà
    const checkUser = await pool.query("SELECT * FROM users WHERE email = $1", ["demo@example.com"])

    if (checkUser.rows.length === 0) {
      await pool.query("INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4)", [
        "demo@example.com",
        hashedPassword,
        "Demo",
        "User",
      ])
      console.log("Utilisateur de démonstration créé")
    } else {
      console.log("L'utilisateur de démonstration existe déjà")
    }

    console.log("Table des utilisateurs initialisée avec succès")
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la table des utilisateurs:", error)
  } finally {
    await pool.end()
    process.exit(0)
  }
}

initUsersTable()

