// Utilitaire pour gérer les chemins d'images des iPhones

// Fonction pour normaliser les noms (enlever les accents, mettre en minuscule, remplacer les espaces)
export function normalizeString(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
}

// Fonction pour convertir un nom de couleur en chemin de dossier
export function colorToPath(color: string): string {
  const normalizedColor = normalizeString(color)

  // Mappings spécifiques pour certaines couleurs
  const colorMappings: Record<string, string> = {
    "titane-dore": "titane-dore",
    "titane-graphite": "titane-graphite",
    "titane-argent": "titane-argent",
    "titane-bleu-nuit": "titane-bleu-nuit",
    "bleu-ocean": "bleu-ocean",
    "vert-foret": "vert-foret",
    "violet-lavande": "violet-lavande",
    "gris-sideral": "gris-sideral",
    "lumiere-stellaire": "lumiere-stellaire",
    "titane-naturel": "titane-naturel",
    "titane-bleu": "titane-bleu",
    "titane-blanc": "titane-blanc",
    "titane-noir": "titane-noir",
    "violet-intense": "violet-intense",
    "noir-sideral": "noir-sideral",
    "product-red": "product-red",
  }

  // Vérifier si nous avons un mapping spécifique
  if (colorMappings[normalizedColor]) {
    return colorMappings[normalizedColor]
  }

  return normalizedColor
}

// Fonction pour déterminer le modèle à partir du nom complet
export function getModelFromName(name: string): string {
  const normalizedName = name.toLowerCase()

  if (normalizedName.includes("pro max")) {
    return "pro-max"
  } else if (normalizedName.includes("pro")) {
    return "pro"
  } else if (normalizedName.includes("plus")) {
    return "plus"
  } else {
    return "standard"
  }
}

// Fonction pour déterminer la série à partir du nom complet
export function getSeriesFromName(name: string): string {
  const normalizedName = name.toLowerCase()

  if (normalizedName.includes("16")) {
    return "iphone16"
  } else if (normalizedName.includes("15")) {
    return "iphone15"
  } else if (normalizedName.includes("14")) {
    return "iphone14"
  } else {
    return "iphone16" // Par défaut
  }
}

// Fonction principale pour obtenir le chemin d'image
export function getIPhoneImagePath(name: string, color: string): string {
  const series = getSeriesFromName(name)
  const model = getModelFromName(name)
  const colorPath = colorToPath(color)

  return `/images/iphones/${series}/${model}/${colorPath}.png`
}

// Fonction pour obtenir un placeholder en cas d'image manquante
export function getPlaceholderImage(name: string): string {
  return `/placeholder.svg?height=400&width=200&text=${encodeURIComponent(name)}`
}

