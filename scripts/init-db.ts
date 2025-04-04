import { query } from "../lib/db"

async function initDatabase() {
  try {
    console.log("Initialisation de la base de données...")

    // Créer la table iphones si elle n'existe pas
    await query(`
      CREATE TABLE IF NOT EXISTS iphones (
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

    console.log("Tables créées avec succès")

    // Vérifier si des données existent déjà dans la table iphones
    const { rows: iphoneCount } = await query("SELECT COUNT(*) FROM iphones")

    if (Number.parseInt(iphoneCount[0].count) === 0) {
      console.log("Aucun iPhone trouvé dans la base de données, insertion des données...")

      // Insérer quelques iPhones de démonstration
      await query(`
        INSERT INTO iphones (name, image_url, price, colors, display, chip, camera, battery, features, release_year, storage_options, water_resistance, dimensions, weight, series) VALUES
        ('iPhone 16 Pro Max', '/placeholder.svg?height=400&width=200', 1299.00, 'Titane doré, Titane graphite, Titane argent, Titane bleu nuit', 'Écran Super Retina XDR 6,9 pouces avec ProMotion 120Hz et Always-On', 'Puce A18 Pro', 'Système de caméra Pro (50MP principal, Ultra grand-angle 48MP, Téléobjectif 5x)', 'Jusqu''à 32 heures de lecture vidéo', 'Dynamic Island, USB-C 3.2, Bouton Action, Design en titane, Wi-Fi 7, Bluetooth 5.3, Charge rapide 45W', 2024, '256 Go, 512 Go, 1 To, 2 To', 'IP68 (6 mètres pendant 30 minutes maximum)', '160,2 x 77,1 x 8,1 mm', 219.00, 'iPhone 16'),
        
        ('iPhone 16 Pro', '/placeholder.svg?height=400&width=200', 1099.00, 'Titane doré, Titane graphite, Titane argent, Titane bleu nuit', 'Écran Super Retina XDR 6,3 pouces avec ProMotion 120Hz et Always-On', 'Puce A18 Pro', 'Système de caméra Pro (50MP principal, Ultra grand-angle 48MP, Téléobjectif 3x)', 'Jusqu''à 26 heures de lecture vidéo', 'Dynamic Island, USB-C 3.2, Bouton Action, Design en titane, Wi-Fi 7, Bluetooth 5.3, Charge rapide 45W', 2024, '256 Go, 512 Go, 1 To, 2 To', 'IP68 (6 mètres pendant 30 minutes maximum)', '147,0 x 71,2 x 8,1 mm', 185.00, 'iPhone 16'),
        
        ('iPhone 16 Plus', '/placeholder.svg?height=400&width=200', 999.00, 'Bleu océan, Vert forêt, Violet lavande, Gris sidéral, Lumière stellaire', 'Écran Super Retina XDR 6,7 pouces avec 90Hz', 'Puce A18', 'Système à double caméra (48MP principal, Ultra grand-angle 16MP)', 'Jusqu''à 28 heures de lecture vidéo', 'Dynamic Island, USB-C, Bouton Action, Wi-Fi 6E, Bluetooth 5.3, Charge rapide 30W', 2024, '128 Go, 256 Go, 512 Go, 1 To', 'IP68 (6 mètres pendant 30 minutes maximum)', '161,0 x 77,9 x 7,7 mm', 199.00, 'iPhone 16'),
        
        ('iPhone 16', '/placeholder.svg?height=400&width=200', 899.00, 'Bleu océan, Vert forêt, Violet lavande, Gris sidéral, Lumière stellaire', 'Écran Super Retina XDR 6,1 pouces avec 90Hz', 'Puce A18', 'Système à double caméra (48MP principal, Ultra grand-angle 16MP)', 'Jusqu''à 22 heures de lecture vidéo', 'Dynamic Island, USB-C, Bouton Action, Wi-Fi 6E, Bluetooth 5.3, Charge rapide 30W', 2024, '128 Go, 256 Go, 512 Go, 1 To', 'IP68 (6 mètres pendant 30 minutes maximum)', '147,8 x 71,8 x 7,7 mm', 169.00, 'iPhone 16'),
        
        ('iPhone 15 Pro Max', '/placeholder.svg?height=400&width=200', 1199.00, 'Titane naturel, Titane bleu, Titane blanc, Titane noir', 'Écran Super Retina XDR 6,7 pouces avec ProMotion 120Hz et Always-On', 'Puce A17 Pro', 'Système de caméra Pro (48MP principal, Ultra grand-angle 12MP, Téléobjectif 5x)', 'Jusqu''à 29 heures de lecture vidéo', 'Dynamic Island, USB-C 3.0, Bouton Action, Design en titane, Wi-Fi 6E, Bluetooth 5.3, Charge rapide 27W', 2023, '256 Go, 512 Go, 1 To', 'IP68 (6 mètres pendant 30 minutes maximum)', '159,9 x 76,7 x 8,25 mm', 221.00, 'iPhone 15')
      `)

      console.log("Données iPhone insérées avec succès")
    } else {
      console.log(`${iphoneCount[0].count} iPhones déjà présents dans la base de données`)
    }

    // Vérifier si des utilisateurs existent déjà
    const { rows: userCount } = await query("SELECT COUNT(*) FROM users")

    if (Number.parseInt(userCount[0].count) === 0) {
      console.log("Aucun utilisateur trouvé dans la base de données, création d'un utilisateur de démonstration...")

      // Créer un utilisateur de démonstration
      const bcrypt = require("bcryptjs")
      const hashedPassword = await bcrypt.hash("password123", 10)

      await query("INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4)", [
        "demo@example.com",
        hashedPassword,
        "Demo",
        "User",
      ])

      console.log("Utilisateur de démonstration créé avec succès")
    } else {
      console.log(`${userCount[0].count} utilisateurs déjà présents dans la base de données`)
    }

    console.log("Base de données initialisée avec succès")
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la base de données:", error)
  }
}

initDatabase()

