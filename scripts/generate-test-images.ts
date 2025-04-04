import fs from "fs"
import path from "path"
import { createCanvas } from "canvas"

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

// Couleurs hexadécimales pour les images de test
const colorHexMap: Record<string, string> = {
  "titane-dore": "#D4B068",
  "titane-graphite": "#4A4A4A",
  "titane-argent": "#E0E0E0",
  "titane-bleu-nuit": "#1A2B3C",
  "bleu-ocean": "#0077BE",
  "vert-foret": "#228B22",
  "violet-lavande": "#967BB6",
  "noir-sideral": "#1E1E1E",
  "lumiere-stellaire": "#F5F5F5",
  "titane-naturel": "#C0C0C0",
  "titane-bleu": "#4682B4",
  "titane-blanc": "#FFFFFF",
  "titane-noir": "#000000",
  bleu: "#0000FF",
  vert: "#00FF00",
  jaune: "#FFFF00",
  rose: "#FFC0CB",
  noir: "#000000",
  blanc: "#FFFFFF",
  "violet-intense": "#8A2BE2",
  or: "#FFD700",
  argent: "#C0C0C0",
  violet: "#8A2BE2",
  minuit: "#191970",
  "product-red": "#FF0000",
}

// Chemin de base pour les images
const basePath = path.join(process.cwd(), "public", "images", "iphones")

// Fonction pour générer une image de test
function generateTestImage(serie: string, model: string, color: string): void {
  const width = 400
  const height = 800
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext("2d")

  // Fond transparent
  ctx.clearRect(0, 0, width, height)

  // Dessiner la forme de l'iPhone
  ctx.fillStyle = colorHexMap[color] || "#CCCCCC"

  // Corps principal de l'iPhone
  const phoneWidth = width * 0.7
  const phoneHeight = height * 0.85
  const phoneX = (width - phoneWidth) / 2
  const phoneY = (height - phoneHeight) / 2

  // Arrondir les coins
  const cornerRadius = 40
  ctx.beginPath()
  ctx.moveTo(phoneX + cornerRadius, phoneY)
  ctx.lineTo(phoneX + phoneWidth - cornerRadius, phoneY)
  ctx.arcTo(phoneX + phoneWidth, phoneY, phoneX + phoneWidth, phoneY + cornerRadius, cornerRadius)
  ctx.lineTo(phoneX + phoneWidth, phoneY + phoneHeight - cornerRadius)
  ctx.arcTo(
    phoneX + phoneWidth,
    phoneY + phoneHeight,
    phoneX + phoneWidth - cornerRadius,
    phoneY + phoneHeight,
    cornerRadius,
  )
  ctx.lineTo(phoneX + cornerRadius, phoneY + phoneHeight)
  ctx.arcTo(phoneX, phoneY + phoneHeight, phoneX, phoneY + phoneHeight - cornerRadius, cornerRadius)
  ctx.lineTo(phoneX, phoneY + cornerRadius)
  ctx.arcTo(phoneX, phoneY, phoneX + cornerRadius, phoneY, cornerRadius)
  ctx.closePath()
  ctx.fill()

  // Écran (légèrement plus petit que le corps)
  ctx.fillStyle = "#000000"
  const screenWidth = phoneWidth * 0.9
  const screenHeight = phoneHeight * 0.85
  const screenX = (width - screenWidth) / 2
  const screenY = phoneY + (phoneHeight - screenHeight) * 0.4 // Décalé vers le haut

  // Arrondir les coins de l'écran
  const screenCornerRadius = 20
  ctx.beginPath()
  ctx.moveTo(screenX + screenCornerRadius, screenY)
  ctx.lineTo(screenX + screenWidth - screenCornerRadius, screenY)
  ctx.arcTo(screenX + screenWidth, screenY, screenX + screenWidth, screenY + screenCornerRadius, screenCornerRadius)
  ctx.lineTo(screenX + screenWidth, screenY + screenHeight - screenCornerRadius)
  ctx.arcTo(
    screenX + screenWidth,
    screenY + screenHeight,
    screenX + screenWidth - screenCornerRadius,
    screenY + screenHeight,
    screenCornerRadius,
  )
  ctx.lineTo(screenX + screenCornerRadius, screenY + screenHeight)
  ctx.arcTo(screenX, screenY + screenHeight, screenX, screenY + screenHeight - screenCornerRadius, screenCornerRadius)
  ctx.lineTo(screenX, screenY + screenCornerRadius)
  ctx.arcTo(screenX, screenY, screenX + screenCornerRadius, screenY, screenCornerRadius)
  ctx.closePath()
  ctx.fill()

  // Ajouter du texte pour identifier l'iPhone
  ctx.fillStyle = "#FFFFFF"
  ctx.font = "20px Arial"
  ctx.textAlign = "center"
  ctx.fillText(`${serie}`, width / 2, screenY + screenHeight / 3)
  ctx.fillText(`${model}`, width / 2, screenY + screenHeight / 2)
  ctx.fillText(`${color}`, width / 2, screenY + (screenHeight * 2) / 3)

  // Enregistrer l'image
  const outputPath = path.join(basePath, serie, model, `${color}.png`)
  const buffer = canvas.toBuffer("image/png")
  fs.writeFileSync(outputPath, buffer)
  console.log(`Image générée: ${outputPath}`)
}

// Générer toutes les images de test
async function generateAllTestImages() {
  console.log("Génération des images de test...")

  // Vérifier si le dossier de base existe
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true })
    console.log(`Dossier créé: ${basePath}`)
  }

  // Générer les images pour chaque série, modèle et couleur
  for (const serie of series) {
    for (const model of models[serie]) {
      // Créer le dossier du modèle s'il n'existe pas
      const modelPath = path.join(basePath, serie, model)
      if (!fs.existsSync(modelPath)) {
        fs.mkdirSync(modelPath, { recursive: true })
        console.log(`Dossier créé: ${modelPath}`)
      }

      // Générer une image pour chaque couleur
      for (const color of colors[serie][model]) {
        generateTestImage(serie, model, color)
      }
    }
  }

  console.log("Toutes les images de test ont été générées avec succès!")
}

generateAllTestImages().catch(console.error)

