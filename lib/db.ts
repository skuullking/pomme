import { Pool } from "pg"

// Créer un pool de connexions à la base de données
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

// Fonction pour exécuter des requêtes SQL
export async function query(text: string, params?: any[]) {
  const client = await pool.connect()
  try {
    const start = Date.now()
    console.log("Exécution de la requête:", {
      text: text.substring(0, 100) + (text.length > 100 ? "..." : ""),
      params: params ? JSON.stringify(params).substring(0, 100) : "aucun",
    })

    const res = await client.query(text, params)
    const duration = Date.now() - start

    console.log("Requête terminée:", {
      duration: duration + "ms",
      rowCount: res.rowCount,
    })

    return res
  } catch (error) {
    console.error("ERREUR SQL:", error)
    // Rethrow avec plus d'informations
    throw new Error(`Erreur SQL: ${error instanceof Error ? error.message : "Erreur inconnue"}`)
  } finally {
    client.release()
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

