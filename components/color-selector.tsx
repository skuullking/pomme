"use client"
import { motion } from "framer-motion"

interface ColorSelectorProps {
  colors: string[]
  selectedColor: string
  onChange: (color: string) => void
}

// Mapping des noms de couleurs vers des codes hexadécimaux
const colorMap: Record<string, string> = {
  // iPhone 16 Pro / Pro Max (couleurs réelles supposées)
  "Titane naturel": "#9E9E9A",
  "Titane bleu": "#394E64",
  "Titane blanc": "#F5F5F0",
  "Titane noir": "#232323",
  "Titane doré": "#D4AF37",
  "Titane graphite": "#2C3E50",
  "Titane argent": "#BDC3C7",
  "Titane bleu nuit": "#1B2631",

  // iPhone 16 / Plus (couleurs réelles supposées)
  "Bleu océan": "#1A5276",
  "Vert forêt": "#196F3D",
  "Violet lavande": "#9B59B6",
  "Gris sidéral": "#424949",
  "Lumière stellaire": "#FAF7F2",

  // iPhone 16E (couleurs réelles supposées)
  Corail: "#FF7F50",
  Menthe: "#98FB98",
  Indigo: "#4B0082",
  Sable: "#F4A460",
  Noir: "#1F2020",

  // iPhone 15 / Plus (couleurs réelles)
  Bleu: "#7393B0",
  Vert: "#ADC5B0",
  Jaune: "#EDDD8F",
  Rose: "#F9D9CE",

  // iPhone 14 Pro / Pro Max (couleurs réelles)
  "Violet intense": "#735A70",
  Or: "#F4E8CE",
  Argent: "#F1F3F2",
  "Noir sidéral": "#252526",

  // iPhone 14 / Plus (couleurs réelles)
  "Bleu (14)": "#AEC1D3",
  Violet: "#E5DDEA",
  "Jaune (14)": "#FDEB71",
  Minuit: "#31353A",
  "PRODUCT(RED)": "#D02E2E",
}

export default function ColorSelector({ colors, selectedColor, onChange }: ColorSelectorProps) {
  // Séparer les couleurs par des virgules et les nettoyer
  const colorArray = colors.split(",").map((color) => color.trim())

  return (
    <div className="flex justify-center my-4">
      <div className="flex space-x-3">
        {colorArray.map((color, index) => {
          const bgColor = colorMap[color] || "#CCCCCC" // Couleur par défaut si non trouvée

          return (
            <motion.button
              key={index}
              className={`w-8 h-8 rounded-full ${
                selectedColor === color ? "border-2 border-blue-500" : "border border-gray-200"
              }`}
              style={{ backgroundColor: bgColor }}
              onClick={() => onChange(color)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Couleur ${color}`}
            />
          )
        })}
      </div>
    </div>
  )
}

