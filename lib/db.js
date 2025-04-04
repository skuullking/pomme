import { Pool } from "pg"
import "dotenv/config"

// Vérifier si la variable d'environnement est définie
if (!process.env.POSTGRES_URL && !process.env.DATABASE_URL) {
  console.warn("Attention: Aucune URL de connexion PostgreSQL n'a été trouvée dans les variables d'environnement.")
}

// Créer un pool de connexions
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

// Tester la connexion au démarrage
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err)
  } else {
    console.log("Connexion à la base de données établie avec succès")
  }
})

// Fonction pour exécuter des requêtes SQL
export async function query(text, params) {
  try {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start

    console.log("Requête exécutée", {
      text,
      duration,
      rows: res.rowCount,
    })

    return res
  } catch (error) {
    console.error("Erreur lors de l'exécution de la requête:", error)
    throw error
  }
}

// Fonction pour obtenir un client du pool
export async function getClient() {
  const client = await pool.connect()
  const query = client.query
  const release = client.release

  // Remplacer la méthode release pour logger quand un client est libéré
  client.release = () => {
    client.query = query
    client.release = release
    return release.apply(client)
  }

  return client
}

export default {
  query,
  getClient,
}

