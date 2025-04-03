import PhoneModelTemplate from "@/components/phone-model-template"

export default function IPhone15ProPage() {
  const model = {
    id: 7,
    name: "iPhone 15 Pro",
    tagline: "Titanium. So strong. So light. So Pro.",
    description:
      "L'iPhone 15 Pro est conçu avec un châssis en titane, une puce A17 Pro et un système photo professionnel.",
    image: "/placeholder.svg?height=500&width=250",
    price: 999,
    colors: "Titane naturel, Titane bleu, Titane blanc, Titane noir",
    storage_options: "128 Go, 256 Go, 512 Go, 1 To",
    display: "Écran Super Retina XDR 6,1 pouces avec ProMotion 120Hz et Always-On",
    chip: "Puce A17 Pro",
    camera: "Système de caméra Pro (48MP principal, Ultra grand-angle 12MP, Téléobjectif 3x)",
    battery: "Jusqu'à 23 heures de lecture vidéo",
    features: [
      "Design en titane, plus léger et plus résistant",
      "Dynamic Island",
      "USB-C 3.0",
      "Bouton Action personnalisable",
      "Wi-Fi 6E et Bluetooth 5.3",
      "Charge rapide 27W",
    ],
    release_year: 2023,
    water_resistance: "IP68 (6 mètres pendant 30 minutes maximum)",
    dimensions: "146,6 x 70,6 x 8,25 mm",
    weight: 187.0,
  }

  return <PhoneModelTemplate model={model} />
}

