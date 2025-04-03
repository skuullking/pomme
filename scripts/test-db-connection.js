// Ce script permet de tester la connexion à la base de données
import { createPool } from "@vercel/postgres"

async function testConnection() {
  const pool = createPool()

  try {
    console.log("Test de la connexion à la base de données...")

    const { rows } = await pool.query("SELECT NOW()")
    console.log("Connexion à la base de données réussie!")
    console.log("Heure actuelle de la base de données:", rows[0].now)

    // Test de récupération des iPhones
    const { rows: iphones } = await pool.query("SELECT COUNT(*) FROM iphones")
    console.log(`La base de données contient ${iphones[0].count} enregistrements d'iPhone`)

    // Test de récupération des utilisateurs
    const { rows: users } = await pool.query("SELECT COUNT(*) FROM users")
    console.log(`La base de données contient ${users[0].count} utilisateurs`)
  } catch (error) {
    console.error("Échec de la connexion à la base de données:", error)
  } finally {
    await pool.end()
  }
}

testConnection()

