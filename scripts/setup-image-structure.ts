import fs from "fs"
import path from "path"

// Définir les séries d'iPhone
const series = ["iphone16", "iphone15", "iphone14"]

// Définir les modèles pour chaque série
const models = {
  iphone16: ["pro-max", "pro", "plus", "standard"],
  iphone15: ["pro-max", "pro", "plus", "standard"],
  iphone14: ["pro-max", "pro", "plus", "standard"],
}

// Définir les couleurs pour chaque série et modèle
const colors = {
  iphone16: {
    "pro-max": ["titane-dore", "titane-graphite", "titane-argent", "titane-bleu-nuit"],
    pro: ["titane-dore", "titane-graphite", "titane-argent", "titane-bleu-nuit"],
    plus: ["bleu-ocean", "vert-foret", "violet-lavande", "noir-sideral", "lumiere-stellaire"],
    standard: ["bleu-ocean", "vert-foret", "violet-lavande", "noir-sideral", "lumiere-stellaire"],
  },
  iphone15: {
    "pro-max": ["titane-naturel", "titane-bleu", "titane-blanc", "titane-noir"],
    pro: ["titane-naturel", "titane-bleu", "titane-blanc", "titane-noir"],
    plus: ["bleu", "vert", "jaune", "rose", "noir", "blanc"],
    standard: ["bleu", "vert", "jaune", "rose", "noir", "blanc"],
  },
  iphone14: {
    "pro-max": ["violet-intense", "or", "argent", "noir-sideral"],
    pro: ["violet-intense", "or", "argent", "noir-sideral"],
    plus: ["bleu", "violet", "minuit", "lumiere-stellaire", "product-red"],
    standard: ["bleu", "violet", "minuit", "lumiere-stellaire", "product-red"],
  },
}

// Chemin de base pour les images
const basePath = path.join(process.cwd(), "public", "images", "iphones")

// Créer la structure de dossiers
async function createDirectoryStructure() {
  console.log("Création de la structure de dossiers pour les images d'iPhone...")

  // Créer le dossier de base s'il n'existe pas
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true })
    console.log(`Dossier créé: ${basePath}`)
  }

  // Créer les dossiers pour chaque série
  for (const serie of series) {
    const seriePath = path.join(basePath, serie)
    if (!fs.existsSync(seriePath)) {
      fs.mkdirSync(seriePath, { recursive: true })
      console.log(`Dossier créé: ${seriePath}`)
    }

    // Créer les dossiers pour chaque modèle
    for (const model of models[serie]) {
      const modelPath = path.join(seriePath, model)
      if (!fs.existsSync(modelPath)) {
        fs.mkdirSync(modelPath, { recursive: true })
        console.log(`Dossier créé: ${modelPath}`)
      }
    }
  }

  console.log("Structure de dossiers créée avec succès!")
  console.log("\nPour ajouter vos images, placez-les dans les dossiers correspondants:")
  console.log("/public/images/iphones/[série]/[modèle]/[couleur].png")
  console.log("\nExemple:")
  console.log("/public/images/iphones/iphone16/pro/titane-graphite.png")
}

createDirectoryStructure().catch(console.error)

