"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import SiteNavigation from "@/components/site-navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Données fictives pour la recherche
const allIPhones = [
  // iPhone 16 Series
  {
    id: 1,
    name: "iPhone 16 Pro Max",
    image: "/placeholder.svg?height=400&width=200",
    price: 1299,
    year: 2024,
    url: "/models/iphone-16-pro-max",
  },
  {
    id: 2,
    name: "iPhone 16 Pro",
    image: "/placeholder.svg?height=400&width=200",
    price: 1099,
    year: 2024,
    url: "/models/iphone-16-pro",
  },
  {
    id: 3,
    name: "iPhone 16 Plus",
    image: "/placeholder.svg?height=400&width=200",
    price: 999,
    year: 2024,
    url: "/models/iphone-16-plus",
  },
  {
    id: 4,
    name: "iPhone 16",
    image: "/placeholder.svg?height=400&width=200",
    price: 899,
    year: 2024,
    url: "/models/iphone-16",
  },
  {
    id: 5,
    name: "iPhone 16E",
    image: "/placeholder.svg?height=400&width=200",
    price: 799,
    year: 2024,
    url: "/models/iphone-16e",
  },

  // iPhone 15 Series
  {
    id: 6,
    name: "iPhone 15 Pro Max",
    image: "/placeholder.svg?height=400&width=200",
    price: 1199,
    year: 2023,
    url: "/models/iphone-15-pro-max",
  },
  {
    id: 7,
    name: "iPhone 15 Pro",
    image: "/placeholder.svg?height=400&width=200",
    price: 999,
    year: 2023,
    url: "/models/iphone-15-pro",
  },
  {
    id: 8,
    name: "iPhone 15 Plus",
    image: "/placeholder.svg?height=400&width=200",
    price: 899,
    year: 2023,
    url: "/models/iphone-15-plus",
  },
  {
    id: 9,
    name: "iPhone 15",
    image: "/placeholder.svg?height=400&width=200",
    price: 799,
    year: 2023,
    url: "/models/iphone-15",
  },

  // iPhone 14 Series
  {
    id: 10,
    name: "iPhone 14 Pro Max",
    image: "/placeholder.svg?height=400&width=200",
    price: 1099,
    year: 2022,
    url: "/models/iphone-14-pro-max",
  },
  {
    id: 11,
    name: "iPhone 14 Pro",
    image: "/placeholder.svg?height=400&width=200",
    price: 999,
    year: 2022,
    url: "/models/iphone-14-pro",
  },
  {
    id: 12,
    name: "iPhone 14 Plus",
    image: "/placeholder.svg?height=400&width=200",
    price: 899,
    year: 2022,
    url: "/models/iphone-14-plus",
  },
  {
    id: 13,
    name: "iPhone 14",
    image: "/placeholder.svg?height=400&width=200",
    price: 799,
    year: 2022,
    url: "/models/iphone-14",
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchTerm, setSearchTerm] = useState(query)
  const [results, setResults] = useState<typeof allIPhones>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setSearchTerm(query)

    // Simuler une recherche
    setLoading(true)
    setTimeout(() => {
      if (!query) {
        setResults(allIPhones)
      } else {
        const filtered = allIPhones.filter((phone) => phone.name.toLowerCase().includes(query.toLowerCase()))
        setResults(filtered)
      }
      setLoading(false)
    }, 500)
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Rediriger vers la même page avec le nouveau paramètre de recherche
    window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNavigation />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Recherche</h1>

            <form onSubmit={handleSearch} className="mb-12">
              <div className="relative">
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher un iPhone, modèle, fonctionnalité..."
                  className="bg-gray-900 border-gray-700 text-white pl-10 py-6 text-lg"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700"
                >
                  Rechercher
                </Button>
              </div>
            </form>

            {loading ? (
              <div className="flex justify-center py-12">
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: { duration: 1.5, ease: "linear", repeat: Number.POSITIVE_INFINITY },
                    scale: { duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
                  }}
                  className="rounded-full h-12 w-12 border-t-2 border-b-2 border-white"
                />
              </div>
            ) : (
              <div>
                <p className="mb-6 text-gray-400">
                  {results.length === 0
                    ? `Aucun résultat pour "${query}"`
                    : `${results.length} résultat${results.length > 1 ? "s" : ""} pour "${query}"`}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((phone) => (
                    <motion.div
                      key={phone.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors"
                    >
                      <Link href={phone.url} className="block">
                        <div className="p-4">
                          <div className="relative h-48 mb-4">
                            <Image
                              src={phone.image || "/placeholder.svg"}
                              alt={phone.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <h2 className="text-xl font-semibold mb-2">{phone.name}</h2>
                          <div className="flex justify-between items-center">
                            <p className="text-gray-400">{phone.year}</p>
                            <p className="font-bold">{phone.price} €</p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

