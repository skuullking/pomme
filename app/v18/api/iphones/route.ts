import { NextResponse } from "next/server"
import type { PhoneModel } from "@/types/phone"

// Détection du mode prévisualisation
const isPreview =
  process.env.VERCEL_ENV === "preview" ||
  !process.env.POSTGRES_URL ||
  !process.env.DATABASE_URL ||
  process.env.NODE_ENV === "development"

export async function GET() {
  try {
    console.log("Récupération des iPhones...")
    console.log("Mode prévisualisation:", isPreview ? "Oui" : "Non")

    // En mode prévisualisation ou sans connexion à la base de données, retourner directement les données fictives
    if (isPreview) {
      console.log("Utilisation des données fictives (mode prévisualisation)")
      return NextResponse.json(mockIphones)
    }

    // Uniquement tenter de se connecter à la base de données si nous ne sommes pas en mode prévisualisation
    try {
      // Import dynamique pour éviter les erreurs en mode prévisualisation
      const { sql } = await import("@vercel/postgres")

      const { rows } = await sql<PhoneModel>`
        SELECT * FROM iphones 
        ORDER BY release_year DESC, price DESC
      `
      console.log(`${rows.length} iPhones récupérés depuis la base de données`)

      // Si aucune donnée n'est récupérée, utiliser les données fictives
      if (!rows || rows.length === 0) {
        console.log("Aucune donnée récupérée, utilisation des données fictives")
        return NextResponse.json(mockIphones)
      }

      return NextResponse.json(rows)
    } catch (dbError) {
      console.error("Erreur de base de données:", dbError)
      console.log("Utilisation des données fictives suite à une erreur de base de données")
      return NextResponse.json(mockIphones)
    }
  } catch (error) {
    console.error("Erreur générale:", error)
    console.log("Utilisation des données fictives suite à une erreur générale")
    return NextResponse.json(mockIphones)
  }
}

// Données fictives pour les utiliser quand la base de données n'est pas disponible
const mockIphones: PhoneModel[] = [
  // iPhone 16 Series (fictifs)
  {
    id: 1,
    name: "iPhone 16 Pro Max",
    image_url: "/placeholder.svg?height=400&width=200",
    price: 1299.0,
    colors: "Titane doré, Titane graphite, Titane argent, Titane bleu nuit",
    display: "Écran Super Retina XDR 6,9 pouces avec ProMotion 120Hz et Always-On",
    chip: "Puce A18 Pro",
    camera: "Système de caméra Pro (50MP principal, Ultra grand-angle 48MP, Téléobjectif 5x)",
    battery: "Jusqu'à 32 heures de lecture vidéo",
    features: "Dynamic Island, USB-C 3.2, Bouton Action, Design en titane, Wi-Fi 7, Bluetooth 5.3, Charge rapide 45W",
    release_year: 2024,
    storage_options: "256 Go, 512 Go, 1 To, 2 To",
    water_resistance: "IP68 (6 mètres pendant 30 minutes maximum)",
    dimensions: "160,2 x 77,1 x 8,1 mm",
    weight: 219.0,
    series: "iPhone 16",
  },
  {
    id: 2,
    name: "iPhone 16 Pro",
    image_url: "/placeholder.svg?height=400&width=200",
    price: 1099.0,
    colors: "Titane doré, Titane graphite, Titane argent, Titane bleu nuit",
    display: "Écran Super Retina XDR 6,3 pouces avec ProMotion 120Hz et Always-On",
    chip: "Puce A18 Pro",
    camera: "Système de caméra Pro (50MP principal, Ultra grand-angle 48MP, Téléobjectif 3x)",
    battery: "Jusqu'à 26 heures de lecture vidéo",
    features: "Dynamic Island, USB-C 3.2, Bouton Action, Design en titane, Wi-Fi 7, Bluetooth 5.3, Charge rapide 45W",
    release_year: 2024,
    storage_options: "256 Go, 512 Go, 1 To, 2 To",
    water_resistance: "IP68 (6 mètres pendant 30 minutes maximum)",
    dimensions: "147,0 x 71,2 x 8,1 mm",
    weight: 185.0,
    series: "iPhone 16",
  },
  {
    id: 3,
    name: "iPhone 16 Plus",
    image_url: "/placeholder.svg?height=400&width=200",
    price: 999.0,
    colors: "Bleu océan, Vert forêt, Violet lavande, Gris sidéral, Lumière stellaire",
    display: "Écran Super Retina XDR 6,7 pouces avec 90Hz",
    chip: "Puce A18",
    camera: "Système à double caméra (48MP principal, Ultra grand-angle 16MP)",
    battery: "Jusqu'à 28 heures de lecture vidéo",
    features: "Dynamic Island, USB-C, Bouton Action, Wi-Fi 6E, Bluetooth 5.3, Charge rapide 30W",
    release_year: 2024,
    storage_options: "128 Go, 256 Go, 512 Go, 1 To",
    water_resistance: "IP68 (6 mètres pendant 30 minutes maximum)",
    dimensions: "161,0 x 77,9 x 7,7 mm",
    weight: 199.0,
    series: "iPhone 16",
  },
  {
    id: 4,
    name: "iPhone 16",
    image_url: "/placeholder.svg?height=400&width=200",
    price: 899.0,
    colors: "Bleu océan, Vert forêt, Violet lavande, Gris sidéral, Lumière stellaire",
    display: "Écran Super Retina XDR 6,1 pouces avec 90Hz",
    chip: "Puce A18",
    camera: "Système à double caméra (48MP principal, Ultra grand-angle 16MP)",
    battery: "Jusqu'à 22 heures de lecture vidéo",
    features: "Dynamic Island, USB-C, Bouton Action, Wi-Fi 6E, Bluetooth 5.3, Charge rapide 30W",
    release_year: 2024,
    storage_options: "128 Go, 256 Go, 512 Go, 1 To",
    water_resistance: "IP68 (6 mètres pendant 30 minutes maximum)",
    dimensions: "147,8 x 71,8 x 7,7 mm",
    weight: 169.0,
    series: "iPhone 16",
  },
  {
    id: 5,
    name: "iPhone 15 Pro Max",
    image_url: "/placeholder.svg?height=400&width=200",
    price: 1199.0,
    colors: "Titane naturel, Titane bleu, Titane blanc, Titane noir",
    display: "Écran Super Retina XDR 6,7 pouces avec ProMotion 120Hz et Always-On",
    chip: "Puce A17 Pro",
    camera: "Système de caméra Pro (48MP principal, Ultra grand-angle 12MP, Téléobjectif 5x)",
    battery: "Jusqu'à 29 heures de lecture vidéo",
    features: "Dynamic Island, USB-C 3.0, Bouton Action, Design en titane, Wi-Fi 6E, Bluetooth 5.3, Charge rapide 27W",
    release_year: 2023,
    storage_options: "256 Go, 512 Go, 1 To",
    water_resistance: "IP68 (6 mètres pendant 30 minutes maximum)",
    dimensions: "159,9 x 76,7 x 8,25 mm",
    weight: 221.0,
    series: "iPhone 15",
  },
  {
    id: 6,
    name: "iPhone 15 Pro",
    image_url: "/placeholder.svg?height=400&width=200",
    price: 999.0,
    colors: "Titane naturel, Titane bleu, Titane blanc, Titane noir",
    display: "Écran Super Retina XDR 6,1 pouces avec ProMotion 120Hz et Always-On",
    chip: "Puce A17 Pro",
    camera: "Système de caméra Pro (48MP principal, Ultra grand-angle 12MP, Téléobjectif 3x)",
    battery: "Jusqu'à 23 heures de lecture vidéo",
    features: "Dynamic Island, USB-C 3.0, Bouton Action, Design en titane, Wi-Fi 6E, Bluetooth 5.3, Charge rapide 27W",
    release_year: 2023,
    storage_options: "128 Go, 256 Go, 512 Go, 1 To",
    water_resistance: "IP68 (6 mètres pendant 30 minutes maximum)",
    dimensions: "146,6 x 70,6 x 8,25 mm",
    weight: 187.0,
    series: "iPhone 15",
  },
]

