import { Pool } from "pg"
import bcrypt from "bcryptjs"

// Créer un pool de connexions à la base de données
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

async function resetAndSeedDatabase() {
  const client = await pool.connect()

  try {
    console.log("=== RÉINITIALISATION ET PEUPLEMENT DE LA BASE DE DONNÉES ===")

    // Commencer une transaction
    await client.query("BEGIN")

    console.log("1. Suppression des tables existantes...")
    // Supprimer les tables dans l'ordre inverse des dépendances
    await client.query("DROP TABLE IF EXISTS price_alerts CASCADE")
    await client.query("DROP TABLE IF EXISTS saved_comparisons CASCADE")
    await client.query("DROP TABLE IF EXISTS user_preferences CASCADE")
    await client.query("DROP TABLE IF EXISTS users CASCADE")
    await client.query("DROP TABLE IF EXISTS iphones CASCADE")

    console.log("2. Création de la table iphones...")
    await client.query(`
      CREATE TABLE iphones (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        colors TEXT NOT NULL,
        display TEXT NOT NULL,
        chip VARCHAR(100) NOT NULL,
        camera TEXT NOT NULL,
        battery TEXT NOT NULL,
        features TEXT NOT NULL,
        release_year INTEGER NOT NULL,
        storage_options TEXT NOT NULL,
        water_resistance VARCHAR(100),
        dimensions VARCHAR(100) NOT NULL,
        weight NUMERIC(6, 2) NOT NULL,
        series VARCHAR(50) NOT NULL
      )
    `)

    console.log("3. Création de la table users...")
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `)

    console.log("4. Insertion des données iPhone...")
    // Insérer quelques iPhones de démonstration
    await client.query(`
      INSERT INTO iphones (name, image_url, price, colors, display, chip, camera, battery, features, release_year, storage_options, water_resistance, dimensions, weight, series) VALUES
      ('iPhone 16 Pro Max', '/placeholder.svg?height=400&width=200', 1299.00, 'Titane doré, Titane graphite, Titane argent, Titane bleu nuit', 'Écran Super Retina XDR 6,9 pouces avec ProMotion 120Hz et Always-On', 'Puce A18 Pro', 'Système de caméra Pro (50MP principal, Ultra grand-angle 48MP, Téléobjectif 5x)', 'Jusqu''à 32 heures de lecture vidéo', 'Dynamic Island, USB-C 3.2, Bouton Action, Design en titane, Wi-Fi 7, Bluetooth 5.3, Charge rapide 45W', 2024, '256 Go, 512 Go, 1 To, 2 To', 'IP68 (6 mètres pendant 30 minutes maximum)', '160,2 x 77,1 x 8,1 mm', 219.00, 'iPhone 16'),
      
      ('iPhone 16 Pro', '/placeholder.svg?height=400&width=200', 1099.00, 'Titane doré, Titane graphite, Titane argent, Titane bleu nuit', 'Écran Super Retina XDR 6,3 pouces avec ProMotion 120Hz et Always-On', 'Puce A18 Pro', 'Système de caméra Pro (50MP principal, Ultra grand-angle 48MP, Téléobjectif 3x)', 'Jusqu''à 26 heures de lecture vidéo', 'Dynamic Island, USB-C 3.2, Bouton Action, Design en titane, Wi-Fi 7, Bluetooth 5.3, Charge rapide 45W', 2024, '256 Go, 512 Go, 1 To, 2 To', 'IP68 (6 mètres pendant 30 minutes maximum)', '147,0 x 71,2 x 8,1 mm', 185.00, 'iPhone 16'),
      
      ('iPhone 16 Plus', '/placeholder.svg?height=400&width=200', 999.00, 'Bleu océan, Vert forêt, Violet lavande, Gris sidéral, Lumière stellaire', 'Écran Super Retina XDR 6,7 pouces avec 90Hz', 'Puce A18', 'Système à double caméra (48MP principal, Ultra grand-angle 16MP)', 'Jusqu''à 28 heures de lecture vidéo', 'Dynamic Island, USB-C, Bouton Action, Wi-Fi 6E, Bluetooth 5.3, Charge rapide 30W', 2024, '128 Go, 256 Go, 512 Go, 1 To', 'IP68 (6 mètres pendant 30 minutes maximum)', '161,0 x 77,9 x 7,7 mm', 199.00, 'iPhone 16'),
      
      ('iPhone 16', '/placeholder.svg?height=400&width=200', 899.00, 'Bleu océan, Vert forêt, Violet lavande, Gris sidéral, Lumière stellaire', 'Écran Super Retina XDR 6,1 pouces avec 90Hz', 'Puce A18', 'Système à double caméra (48MP principal, Ultra grand-angle 16MP)', 'Jusqu''à 22 heures de lecture vidéo', 'Dynamic Island, USB-C, Bouton Action, Wi-Fi 6E, Bluetooth 5.3, Charge rapide 30W', 2024, '128 Go, 256 Go, 512 Go, 1 To', 'IP68 (6 mètres pendant 30 minutes maximum)', '147,8 x 71,8 x 7,7 mm', 169.00, 'iPhone 16'),
      
      ('iPhone 15 Pro Max', '/placeholder.svg?height=400&width=200', 1199.00, 'Titane naturel, Titane bleu, Titane blanc, Titane noir', 'Écran Super Retina XDR 6,7 pouces avec ProMotion 120Hz et Always-On', 'Puce A17 Pro', 'Système de caméra Pro (48MP principal, Ultra grand-angle 12MP, Téléobjectif 5x)', 'Jusqu''à 29 heures de lecture vidéo', 'Dynamic Island, USB-C 3.0, Bouton Action, Design en titane, Wi-Fi 6E, Bluetooth 5.3, Charge rapide 27W', 2023, '256 Go, 512 Go, 1 To', 'IP68 (6 mètres pendant 30 minutes maximum)', '159,9 x 76,7 x 8,25 mm', 221.00, 'iPhone 15')
    `)

    console.log("5. Création d'un utilisateur de démonstration...")
    // Créer un utilisateur de démonstration avec mot de passe haché
    const hashedPassword = await bcrypt.hash("password123", 10)
    await client.query("INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4)", [
      "demo@example.com",
      hashedPassword,
      "Demo",
      "User",
    ])

    // Valider la transaction
    await client.query("COMMIT")
    console.log("✅ Base de données réinitialisée et peuplée avec succès!")

    // Vérifier les données insérées
    const { rows: iphoneCount } = await client.query("SELECT COUNT(*) FROM iphones")
    console.log(`Nombre d'iPhones insérés: ${iphoneCount[0].count}`)

    const { rows: userCount } = await client.query("SELECT COUNT(*) FROM users")
    console.log(`Nombre d'utilisateurs insérés: ${userCount[0].count}`)

    return true
  } catch (error) {
    // Annuler la transaction en cas d'erreur
    await client.query("ROLLBACK")
    console.error("❌ ERREUR lors de la réinitialisation de la base de données:", error)
    return false
  } finally {
    client.release()
    await pool.end()
  }
}

// Exécuter le script
resetAndSeedDatabase()
  .then((success) => {
    if (success) {
      console.log("Script terminé avec succès")
    } else {
      console.log("Script terminé avec des erreurs")
    }
    process.exit(0)
  })
  .catch((err) => {
    console.error("Erreur inattendue:", err)
    process.exit(1)
  })

