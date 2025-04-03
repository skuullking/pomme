"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import ComparePhones from "@/components/compare-phones"
import SiteNavigation from "@/components/site-navigation"
import type { PhoneModel } from "@/types/phone"

// Données fictives de secours en cas d'erreur
const fallbackPhones: PhoneModel[] = [
  {
    id: 1,
    name: "iPhone 16 Pro Max",
    image_url: "/placeholder.svg?height=400&width=200",
    price: 1299.0,
    colors: "Titane doré, Titane graphite, Titane argent, Titane bleu nuit",
    display: "Écran Super Retina XDR 6,9 pouces avec ProMotion 120Hz et Always-On",
    chip: "Puce A18 Pro",
    camera: "Système de caméra Pro (50MP principal, Ultra grand-angle 48MP, Téléobjectif 5x)",
    battery: "Jusqu'à 32 heures de lecture vidéo",
    features: "Dynamic Island, USB-C 3.2, Bouton Action, Design en titane, Wi-Fi 7, Bluetooth 5.3, Charge rapide 45W",
    release_year: 2024,
    storage_options: "256 Go, 512 Go, 1 To, 2 To",
    water_resistance: "IP68 (6 mètres pendant 30 minutes maximum)",
    dimensions: "160,2 x 77,1 x 8,1 mm",
    weight: 219.0,
    series: "iPhone 16",
  },
  {
    id: 2,
    name: "iPhone 16 Pro",
    image_url: "/placeholder.svg?height=400&width=200",
    price: 1099.0,
    colors: "Titane doré, Titane graphite, Titane argent, Titane bleu nuit",
    display: "Écran Super Retina XDR 6,3 pouces avec ProMotion 120Hz et Always-On",
    chip: "Puce A18 Pro",
    camera: "Système de caméra Pro (50MP principal, Ultra grand-angle 48MP, Téléobjectif 3x)",
    battery: "Jusqu'à 26 heures de lecture vidéo",
    features: "Dynamic Island, USB-C 3.2, Bouton Action, Design en titane, Wi-Fi 7, Bluetooth 5.3, Charge rapide 45W",
    release_year: 2024,
    storage_options: "256 Go, 512 Go, 1 To, 2 To",
    water_resistance: "IP68 (6 mètres pendant 30 minutes maximum)",
    dimensions: "147,0 x 71,2 x 8,1 mm",
    weight: 185.0,
    series: "iPhone 16",
  },
]

export default function ComparePage() {
  const [iphones, setIphones] = useState<PhoneModel[]>([])
  const [selectedPhones, setSelectedPhones] = useState<PhoneModel[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCount, setSelectedCount] = useState(2)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const fetchIphones = async () => {
      try {
        setLoading(true)
        setError(null)

        console.log("Tentative de récupération des iPhones...")

        try {
          // Utiliser un timeout pour éviter que la requête ne bloque trop longtemps
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 5000)

          const response = await fetch("/api/iphones", {
            cache: "no-store",
            signal: controller.signal,
          })

          clearTimeout(timeoutId)

          if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`)
          }

          const data = await response.json()

          // Vérifier que les données sont un tableau
          if (!Array.isArray(data)) {
            console.warn("Les données reçues ne sont pas un tableau")
            throw new Error("Format de données invalide")
          }

          console.log(`${data.length} iPhones récupérés`)

          if (data.length === 0) {
            console.warn("Aucun iPhone récupéré, utilisation des données de secours")
            setIphones(fallbackPhones)
            setSelectedPhones(fallbackPhones.slice(0, 2))
          } else {
            setIphones(data)
            setSelectedPhones(data.slice(0, 2))
          }
        } catch (fetchError) {
          console.error("Erreur lors de la récupération des données:", fetchError)
          throw fetchError
        }

        setLoading(false)
      } catch (error) {
        console.error("Échec complet:", error)
        setError("Impossible de charger les données. Utilisation des données de secours.")

        // Utiliser les données de secours en cas d'erreur
        setIphones(fallbackPhones)
        setSelectedPhones(fallbackPhones.slice(0, 2))
        setLoading(false)
      }
    }

    fetchIphones()
  }, [])

  const handleSliderChange = (value: number[]) => {
    const count = value[0]
    setSelectedCount(count)

    // Update selected phones based on slider value
    if (count <= iphones.length) {
      // Sélectionner les téléphones les plus récents (les premiers dans le tableau)
      setSelectedPhones(iphones.slice(0, count))
    }
  }

  const handlePhoneSelection = (phoneId: number, position: number) => {
    const phone = iphones.find((p) => p.id === phoneId)
    if (phone) {
      const newSelectedPhones = [...selectedPhones]
      newSelectedPhones[position] = phone
      setSelectedPhones(newSelectedPhones)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteNavigation />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Comparer les modèles d'iPhone
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">Trouvez l'iPhone parfait pour vous</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            ) : error ? (
              <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-600">{error}</p>
                <p className="mt-2 text-gray-600">Affichage des données de secours pour continuer.</p>
                <Button className="mt-4" variant="outline" onClick={() => window.location.reload()}>
                  Réessayer
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-12 max-w-md mx-auto">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-center">Sélectionnez le nombre d'iPhones à comparer</h2>
                    <div className="px-4">
                      <Slider
                        defaultValue={[2]}
                        max={4}
                        min={2}
                        step={1}
                        onValueChange={handleSliderChange}
                        className="my-4"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-12">
                  <div
                    className={`grid gap-4 mx-auto ${
                      selectedCount === 2
                        ? "grid-cols-1 md:grid-cols-2 max-w-4xl"
                        : selectedCount === 3
                          ? "grid-cols-1 md:grid-cols-3 max-w-5xl"
                          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full"
                    }`}
                  >
                    {Array.from({ length: selectedCount }).map((_, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <label htmlFor={`phone-select-${index}`} className="block mb-2 text-sm font-medium">
                          iPhone {index + 1}
                        </label>
                        <select
                          id={`phone-select-${index}`}
                          className="w-full p-2 border rounded-md"
                          value={selectedPhones[index]?.id || ""}
                          onChange={(e) => handlePhoneSelection(Number(e.target.value), index)}
                        >
                          {Array.isArray(iphones) && iphones.length > 0 ? (
                            iphones.map((phone) => (
                              <option key={phone.id} value={phone.id}>
                                {phone.name}
                              </option>
                            ))
                          ) : (
                            <option value="">Aucun iPhone disponible</option>
                          )}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                <ComparePhones models={selectedPhones} />

                <div className="mt-16 flex justify-center">
                  <Button className="rounded-full px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700">
                    Acheter un iPhone
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

