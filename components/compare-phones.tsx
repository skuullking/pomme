"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { PhoneModel } from "@/types/phone"
import ColorSelector from "./color-selector"
import StorageSelector from "./storage-selector"

interface ComparePhoneProps {
  models: PhoneModel[]
}

// Inverser l'ordre des éléments dans le composant ComparePhones
// Mettre les modèles d'iPhone en haut et les sections de comparaison en bas

export default function ComparePhones({ models }: ComparePhoneProps) {
  // Ensure models is an array
  const phoneModels = Array.isArray(models) ? models : []
  const [activeSection, setActiveSection] = useState<string | null>(null)

  if (!phoneModels.length) {
    return <div className="text-center py-8">Aucun iPhone sélectionné</div>
  }

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section)
  }

  return (
    <div className="flex flex-col w-full">
      {/* Affichage des modèles - maintenant en PREMIER */}
      <div className="flex justify-center w-full mb-12">
        <div
          className={`grid gap-8 ${
            phoneModels.length === 2
              ? "grid-cols-1 md:grid-cols-2 max-w-4xl"
              : phoneModels.length === 3
                ? "grid-cols-1 md:grid-cols-3 max-w-5xl"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full"
          }`}
        >
          {phoneModels.map((model, index) => (
            <PhoneCard key={index} model={model} totalPhones={phoneModels.length} />
          ))}
        </div>
      </div>

      {/* Sections dépliables synchronisées - maintenant en SECOND */}
      <div className="w-full">
        <div className="w-full max-w-5xl mx-auto">
          <div className="border-t py-4 cursor-pointer" onClick={() => toggleSection("display")}>
            <div className="flex items-center justify-between">
              <span className="font-medium text-lg">Écran</span>
              <span
                className={`transform transition-transform duration-300 ${activeSection === "display" ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </div>
            <AnimatePresence>
              {activeSection === "display" && (
                <motion.div
                  className="mt-4 grid gap-4"
                  style={{
                    gridTemplateColumns: `repeat(${phoneModels.length}, 1fr)`,
                  }}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {phoneModels.map((model, index) => (
                    <div key={index} className="text-gray-600 p-2">
                      <h3 className="font-medium mb-2">{model.name}</h3>
                      <p>{model.display}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
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
            <AnimatePresence>
              {activeSection === "chip" && (
                <motion.div
                  className="mt-4 grid gap-4"
                  style={{
                    gridTemplateColumns: `repeat(${phoneModels.length}, 1fr)`,
                  }}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {phoneModels.map((model, index) => (
                    <div key={index} className="text-gray-600 p-2">
                      <h3 className="font-medium mb-2">{model.name}</h3>
                      <p>{model.chip}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
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
            <AnimatePresence>
              {activeSection === "camera" && (
                <motion.div
                  className="mt-4 grid gap-4"
                  style={{
                    gridTemplateColumns: `repeat(${phoneModels.length}, 1fr)`,
                  }}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {phoneModels.map((model, index) => (
                    <div key={index} className="text-gray-600 p-2">
                      <h3 className="font-medium mb-2">{model.name}</h3>
                      <p>{model.camera}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
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
            <AnimatePresence>
              {activeSection === "battery" && (
                <motion.div
                  className="mt-4 grid gap-4"
                  style={{
                    gridTemplateColumns: `repeat(${phoneModels.length}, 1fr)`,
                  }}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {phoneModels.map((model, index) => (
                    <div key={index} className="text-gray-600 p-2">
                      <h3 className="font-medium mb-2">{model.name}</h3>
                      <p>{model.battery}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="border-t py-4 cursor-pointer" onClick={() => toggleSection("features")}>
            <div className="flex items-center justify-between">
              <span className="font-medium text-lg">Fonctionnalités clés</span>
              <span
                className={`transform transition-transform duration-300 ${activeSection === "features" ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </div>
            <AnimatePresence>
              {activeSection === "features" && (
                <motion.div
                  className="mt-4 grid gap-4"
                  style={{
                    gridTemplateColumns: `repeat(${phoneModels.length}, 1fr)`,
                  }}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {phoneModels.map((model, index) => (
                    <div key={index} className="text-gray-600 p-2">
                      <h3 className="font-medium mb-2">{model.name}</h3>
                      <ul className="space-y-2">
                        {(model.features || "").split(",").map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                            <span>{feature.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
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
            <AnimatePresence>
              {activeSection === "dimensions" && (
                <motion.div
                  className="mt-4 grid gap-4"
                  style={{
                    gridTemplateColumns: `repeat(${phoneModels.length}, 1fr)`,
                  }}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {phoneModels.map((model, index) => (
                    <div key={index} className="text-gray-600 p-2">
                      <h3 className="font-medium mb-2">{model.name}</h3>
                      <p>Dimensions: {model.dimensions}</p>
                      <p>Poids: {model.weight} g</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="border-t py-4 cursor-pointer" onClick={() => toggleSection("resistance")}>
            <div className="flex items-center justify-between">
              <span className="font-medium text-lg">Résistance à l'eau</span>
              <span
                className={`transform transition-transform duration-300 ${activeSection === "resistance" ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </div>
            <AnimatePresence>
              {activeSection === "resistance" && (
                <motion.div
                  className="mt-4 grid gap-4"
                  style={{
                    gridTemplateColumns: `repeat(${phoneModels.length}, 1fr)`,
                  }}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {phoneModels.map((model, index) => (
                    <div key={index} className="text-gray-600 p-2">
                      <h3 className="font-medium mb-2">{model.name}</h3>
                      <p>{model.water_resistance}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

function PhoneCard({ model, totalPhones }: { model: PhoneModel; totalPhones: number }) {
  const [selectedColor, setSelectedColor] = useState(model.colors.split(",")[0].trim())
  const [selectedStorage, setSelectedStorage] = useState(model.storage_options.split(",")[0].trim())

  // Calculer le prix en fonction du stockage sélectionné de manière dynamique
  const calculatePrice = () => {
    const basePrice = model.price
    const storageOptions = model.storage_options.split(",").map((option) => option.trim())
    const selectedIndex = storageOptions.indexOf(selectedStorage)

    // Prix de base pour le premier niveau de stockage
    if (selectedIndex === 0) return basePrice

    // Augmenter le prix en fonction du niveau de stockage
    // 128 Go -> 0€, 256 Go -> +100€, 512 Go -> +300€, 1 To -> +500€
    const priceIncrements = [0, 100, 300, 500]
    const increment = selectedIndex < priceIncrements.length ? priceIncrements[selectedIndex] : selectedIndex * 100

    return basePrice + increment
  }

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * (model.id || 1) }}
    >
      <motion.div
        className={`relative ${totalPhones === 2 ? "h-96 w-48" : "h-80 w-40"} mb-6`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 * (model.id || 1) }}
      >
        <Image
          src={model.image_url || "/placeholder.svg?height=400&width=200"}
          alt={model.name}
          fill
          className="object-contain"
          priority
        />
      </motion.div>
      <h2 className={`${totalPhones === 2 ? "text-3xl" : "text-2xl"} font-semibold mb-2`}>{model.name}</h2>

      {/* Sélecteur de couleurs */}
      <ColorSelector colors={model.colors.split(",")} selectedColor={selectedColor} onChange={setSelectedColor} />

      {/* Sélecteur de stockage */}
      <StorageSelector
        options={model.storage_options}
        selectedStorage={selectedStorage}
        onChange={setSelectedStorage}
      />

      <p className={`${totalPhones === 2 ? "text-2xl" : "text-xl"} mb-4`}>{calculatePrice()}€</p>

      <motion.button
        className="rounded-full px-6 mb-8 bg-blue-600 hover:bg-blue-700 text-white py-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Acheter
      </motion.button>
    </motion.div>
  )
}

