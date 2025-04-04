import { Pool } from "pg"

// Créer un pool de connexions à la base de données avec des logs détaillés
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

async function testConnection() {
  try {
    console.log("=== TEST DE CONNEXION À LA BASE DE DONNÉES ===")
    console.log("URL de connexion:", process.env.POSTGRES_URL ? "Définie" : "Non définie")
    console.log("URL alternative:", process.env.DATABASE_URL ? "Définie" : "Non définie")

    const client = await pool.connect()
    console.log("✅ Connexion établie avec succès!")

    const { rows } = await client.query("SELECT NOW()")
    console.log("Heure actuelle de la base de données:", rows[0].now)

    client.release()
    console.log("Connexion libérée")

    return true
  } catch (error) {
    console.error("❌ ERREUR DE CONNEXION:", error)
    return false
  } finally {
    // Fermer le pool pour terminer le script
    await pool.end()
  }
}

// Exécuter le test
testConnection()
  .then((success) => {
    if (success) {
      console.log("Test terminé avec succès")
    } else {
      console.log("Test terminé avec des erreurs")
    }
    process.exit(0)
  })
  .catch((err) => {
    console.error("Erreur inattendue:", err)
    process.exit(1)
  })

