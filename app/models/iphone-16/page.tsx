import PhoneModelTemplate from "@/components/phone-model-template"

export default function IPhone16Page() {
  const model = {
    id: 4,
    name: "iPhone 16",
    tagline: "Impressionnant par tous les angles.",
    description: "L'iPhone 16 combine puissance, élégance et innovation dans un design parfaitement équilibré.",
    image: "/placeholder.svg?height=500&width=250",
    price: 899,
    colors: "Bleu océan, Vert forêt, Violet lavande, Gris sidéral, Lumière stellaire",
    storage_options: "128 Go, 256 Go, 512 Go, 1 To",
    display: "Écran Super Retina XDR 6,1 pouces avec 90Hz",
    chip: "Puce A18",
    camera: "Système à double caméra (48MP principal, Ultra grand-angle 16MP)",
    battery: "Jusqu'à 22 heures de lecture vidéo",
    features: [
      "Dynamic Island",
      "USB-C avec transfert de données rapide",
      "Bouton Action personnalisable",
      "Wi-Fi 6E et Bluetooth 5.3",
      "Charge rapide 30W",
    ],
    release_year: 2024,
    water_resistance: "IP68 (6 mètres pendant 30 minutes maximum)",
    dimensions: "147,8 x 71,8 x 7,7 mm",
    weight: 169.0,
  }

  return <PhoneModelTemplate model={model} />
}

