import PhoneModelTemplate from "@/components/phone-model-template"

export default function IPhone16ProMaxPage() {
  const model = {
    id: 1,
    name: "iPhone 16 Pro Max",
    tagline: "Plus grand. Plus puissant. Plus Pro que jamais.",
    description:
      "L'iPhone 16 Pro Max offre l'expérience iPhone ultime avec le plus grand écran, la meilleure autonomie et les capacités photo les plus avancées.",
    image: "/placeholder.svg?height=500&width=250",
    price: 1299,
    colors: "Titane doré, Titane graphite, Titane argent, Titane bleu nuit",
    storage_options: "256 Go, 512 Go, 1 To, 2 To",
    display: "Écran Super Retina XDR 6,9 pouces avec ProMotion 120Hz et Always-On",
    chip: "Puce A18 Pro",
    camera: "Système de caméra Pro (50MP principal, Ultra grand-angle 48MP, Téléobjectif 5x)",
    battery: "Jusqu'à 32 heures de lecture vidéo",
    features: [
      "Design en titane, plus léger et plus résistant",
      "Dynamic Island",
      "USB-C 3.2 avec transfert de données ultra-rapide",
      "Bouton Action personnalisable",
      "Wi-Fi 7 et Bluetooth 5.3",
      "Charge rapide 45W",
      "Zoom optique 5x",
    ],
    release_year: 2024,
    water_resistance: "IP68 (6 mètres pendant 30 minutes maximum)",
    dimensions: "160,2 x 77,1 x 8,1 mm",
    weight: 219.0,
  }

  return <PhoneModelTemplate model={model} />
}

