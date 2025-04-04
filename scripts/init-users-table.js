import "dotenv/config"
import { query } from "../lib/db.js"

async function initUsersTable() {
  try {
    console.log("Initialisation de la table des utilisateurs...")

    // Créer la table users si elle n'existe pas
    await query(`
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

    console.log("Table des utilisateurs initialisée avec succès")
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la table des utilisateurs:", error)
  } finally {
    process.exit(0)
  }
}

initUsersTable()

