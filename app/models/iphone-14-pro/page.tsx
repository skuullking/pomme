import PhoneModelTemplate from "@/components/phone-model-template"

export default function IPhone14ProPage() {
  const model = {
    id: 11,
    name: "iPhone 14 Pro",
    tagline: "Pro. Au-delà.",
    description: "L'iPhone 14 Pro introduit Dynamic Island, une nouvelle façon d'interagir avec votre iPhone.",
    image: "/placeholder.svg?height=500&width=250",
    price: 999,
    colors: "Violet intense, Or, Argent, Noir sidéral",
    storage_options: "128 Go, 256 Go, 512 Go, 1 To",
    display: "Écran Super Retina XDR 6,1 pouces avec ProMotion 120Hz et Always-On",
    chip: "Puce A16 Bionic",
    camera: "Système de caméra Pro (48MP principal, Ultra grand-angle 12MP, Téléobjectif 3x)",
    battery: "Jusqu'à 23 heures de lecture vidéo",
    features: [
      "Dynamic Island",
      "Connecteur Lightning",
      "SOS d'urgence",
      "Détection d'accident",
      "Wi-Fi 6 et Bluetooth 5.3",
      "Charge rapide 27W",
    ],
    release_year: 2022,
    water_resistance: "IP68 (6 mètres pendant 30 minutes maximum)",
    dimensions: "147,5 x 71,5 x 7,85 mm",
    weight: 206.0,
  }

  return <PhoneModelTemplate model={model} />
}

