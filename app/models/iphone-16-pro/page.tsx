import PhoneModelTemplate from "@/components/phone-model-template"

export default function IPhone16ProPage() {
  const model = {
    id: 2,
    name: "iPhone 16 Pro",
    tagline: "Titane. Si résistant. Si léger. Si Pro.",
    description:
      "L'iPhone 16 Pro repousse toutes les limites avec sa puce A18 Pro, son système photo professionnel et son design en titane.",
    image: "/placeholder.svg?height=500&width=250",
    price: 1099,
    colors: "Titane doré, Titane graphite, Titane argent, Titane bleu nuit",
    storage_options: "256 Go, 512 Go, 1 To, 2 To",
    display: "Écran Super Retina XDR 6,3 pouces avec ProMotion 120Hz et Always-On",
    chip: "Puce A18 Pro",
    camera: "Système de caméra Pro (50MP principal, Ultra grand-angle 48MP, Téléobjectif 3x)",
    battery: "Jusqu'à 26 heures de lecture vidéo",
    features: [
      "Design en titane, plus léger et plus résistant",
      "Dynamic Island",
      "USB-C 3.2 avec transfert de données ultra-rapide",
      "Bouton Action personnalisable",
      "Wi-Fi 7 et Bluetooth 5.3",
      "Charge rapide 45W",
    ],
    release_year: 2024,
    water_resistance: "IP68 (6 mètres pendant 30 minutes maximum)",
    dimensions: "147,0 x 71,2 x 8,1 mm",
    weight: 185.0,
  }

  return <PhoneModelTemplate model={model} />
}

