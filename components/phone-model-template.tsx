"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import ColorSelector from "@/components/color-selector"
import StorageSelector from "@/components/storage-selector"
import SiteNavigation from "@/components/site-navigation"

interface PhoneModelTemplateProps {
  model: {
    id: number
    name: string
    tagline: string
    description: string
    image: string
    price: number
    colors: string
    storage_options: string
    display: string
    chip: string
    camera: string
    battery: string
    features: string[]
    release_year: number
    water_resistance: string
    dimensions: string
    weight: number
  }
}

export default function PhoneModelTemplate({ model }: PhoneModelTemplateProps) {
  const [selectedColor, setSelectedColor] = useState(model.colors.split(",")[0].trim())
  const [selectedStorage, setSelectedStorage] = useState(model.storage_options.split(",")[0].trim())
  const [activeSection, setActiveSection] = useState<string | null>("features")

  // Calculer le prix en fonction du stockage sélectionné
  const calculatePrice = () => {
    const basePrice = model.price
    const storageOptions = model.storage_options.split(",").map((option) => option.trim())
    const selectedIndex = storageOptions.indexOf(selectedStorage)

    // Prix de base pour le premier niveau de stockage
    if (selectedIndex === 0) return basePrice

    // Augmenter le prix en fonction du niveau de stockage
    const priceIncrements = [0, 100, 300, 500]
    const increment = selectedIndex < priceIncrements.length ? priceIncrements[selectedIndex] : selectedIndex * 100

    return basePrice + increment
  }

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNavigation />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="md:w-1/2 text-center md:text-left mb-12 md:mb-0"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{model.name}</h1>
                <p className="text-xl md:text-2xl text-gray-400 mb-6">{model.tagline}</p>
                <p className="text-gray-300 mb-8 max-w-lg">{model.description}</p>
                <p className="text-3xl font-bold mb-6">À partir de {calculatePrice()} €</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button className="bg-blue-600 hover:bg-blue-700">Acheter</Button>
                  <Link href="/compare">
                    <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                      Comparer
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="md:w-1/2 relative"
              >
                <div className="relative h-[500px] w-full">
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotateZ: [0, 1, 0, -1, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "mirror",
                    }}
                    className="w-full h-full"
                  >
                    <Image
                      src={model.image || "/placeholder.svg"}
                      alt={model.name}
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Options Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Personnalisez votre {model.name}</h2>

            <div className="max-w-4xl mx-auto">
              {/* Sélecteur de couleurs */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold mb-4 text-center">Choisissez une couleur</h3>
                <ColorSelector colors={model.colors} selectedColor={selectedColor} onChange={setSelectedColor} />
              </div>

              {/* Sélecteur de stockage */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold mb-4 text-center">Choisissez une capacité</h3>
                <StorageSelector
                  options={model.storage_options}
                  selectedStorage={selectedStorage}
                  onChange={setSelectedStorage}
                />
              </div>

              <div className="text-center">
                <p className="text-3xl font-bold mb-8">{calculatePrice()} €</p>
                <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">Ajouter au panier</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Caractéristiques Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Caractéristiques</h2>

            <div className="max-w-4xl mx-auto">
              {/* Sections dépliables */}
              <div className="border-t py-4 cursor-pointer" onClick={() => toggleSection("features")}>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg">Fonctionnalités clés</span>
                  <span
                    className={`transform transition-transform duration-300 ${activeSection === "features" ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>
                </div>
                {activeSection === "features" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <ul className="space-y-2">
                      {model.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>

              <div className="border-t py-4 cursor-pointer" onClick={() => toggleSection("display")}>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg">Écran</span>
                  <span
                    className={`transform transition-transform duration-300 ${activeSection === "display" ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>
                </div>
                {activeSection === "display" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <p>{model.display}</p>
                  </motion.div>
                )}
              </div>

              <div className="border-t py-4 cursor-pointer" onClick={() => toggleSection("chip")}>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg">Puce</span>
                  <span
                    className={`transform transition-transform duration-300 ${activeSection === "chip" ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>
                </div>
                {activeSection === "chip" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <p>{model.chip}</p>
                  </motion.div>
                )}
              </div>

              <div className="border-t py-4 cursor-pointer" onClick={() => toggleSection("camera")}>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg">Appareil photo</span>
                  <span
                    className={`transform transition-transform duration-300 ${activeSection === "camera" ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>
                </div>
                {activeSection === "camera" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <p>{model.camera}</p>
                  </motion.div>
                )}
              </div>

              <div className="border-t py-4 cursor-pointer" onClick={() => toggleSection("battery")}>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg">Batterie</span>
                  <span
                    className={`transform transition-transform duration-300 ${activeSection === "battery" ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>
                </div>
                {activeSection === "battery" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <p>{model.battery}</p>
                  </motion.div>
                )}
              </div>

              <div className="border-t py-4 cursor-pointer" onClick={() => toggleSection("dimensions")}>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg">Dimensions et poids</span>
                  <span
                    className={`transform transition-transform duration-300 ${activeSection === "dimensions" ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>
                </div>
                {activeSection === "dimensions" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <p>Dimensions: {model.dimensions}</p>
                    <p>Poids: {model.weight} g</p>
                  </motion.div>
                )}
              </div>

              <div className="border-t border-b py-4 cursor-pointer" onClick={() => toggleSection("resistance")}>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg">Résistance à l'eau</span>
                  <span
                    className={`transform transition-transform duration-300 ${activeSection === "resistance" ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>
                </div>
                {activeSection === "resistance" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <p>{model.water_resistance}</p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Prêt à commander votre {model.name} ?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Choisissez votre modèle, votre couleur et votre capacité de stockage.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">Acheter maintenant</Button>
              <Link href="/compare">
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800 px-8 py-3 text-lg">
                  Comparer les modèles
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Pomme Inc. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}

