import { query } from "../lib/db"

async function testConnection() {
  try {
    console.log("Test de la connexion à la base de données...")
    console.log("URL de connexion:", process.env.POSTGRES_URL ? "Définie" : "Non définie")

    const { rows } = await query("SELECT NOW()")
    console.log("Connexion à la base de données réussie!")
    console.log("Heure actuelle de la base de données:", rows[0].now)

    // Test de récupération des iPhones
    try {
      const { rows: iphones } = await query("SELECT COUNT(*) FROM iphones")
      console.log(`La base de données contient ${iphones[0].count} enregistrements d'iPhone`)
    } catch (error) {
      console.log("La table iphones n'existe pas encore ou n'est pas accessible")
    }

    // Test de récupération des utilisateurs
    try {
      const { rows: users } = await query("SELECT COUNT(*) FROM users")
      console.log(`La base de données contient ${users[0].count} utilisateurs`)
    } catch (error) {
      console.log("La table users n'existe pas encore ou n'est pas accessible")
    }
  } catch (error) {
    console.error("Échec de la connexion à la base de données:", error)
  }
}

testConnection()

