"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ChevronRight } from "lucide-react"
import AppleNavbar from "@/components/apple-navbar"

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const isHeroInView = useInView(heroRef)

  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.9])

  const featuresRef = useRef<HTMLDivElement>(null)
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.2 })

  const iphone16Ref = useRef<HTMLDivElement>(null)
  const isIphone16InView = useInView(iphone16Ref, { once: true, amount: 0.3 })

  const iphone16ProRef = useRef<HTMLDivElement>(null)
  const isIphone16ProInView = useInView(iphone16ProRef, { once: true, amount: 0.3 })

  return (
    <div className="min-h-screen bg-black text-white">
      <AppleNavbar />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="h-screen flex flex-col items-center justify-center relative pt-12 overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isHeroInView ? 1 : 0, y: isHeroInView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center z-10 px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">iPhone 16</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">Titanium. So strong. So light. So Pro.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/v14/compare" className="text-blue-500 hover:text-blue-400 flex items-center text-lg">
              Découvrir <ChevronRight size={16} />
            </Link>
            <Link href="/v14/checkout" className="text-blue-500 hover:text-blue-400 flex items-center text-lg">
              Acheter <ChevronRight size={16} />
            </Link>
          </div>
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isHeroInView ? 1 : 0.8, opacity: isHeroInView ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative w-full h-full max-w-4xl"
          >
            <Image
              src="/placeholder.svg?height=800&width=1200"
              alt="iPhone 16 Pro"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isFeaturesInView ? 1 : 0, y: isFeaturesInView ? 0 : 30 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Pourquoi l'iPhone
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "A18 Pro",
                description: "La puce la plus puissante jamais intégrée à un smartphone.",
                delay: 0.2,
              },
              {
                title: "Appareil photo Pro",
                description: "Un système photo révolutionnaire pour des clichés exceptionnels.",
                delay: 0.4,
              },
              {
                title: "Batterie longue durée",
                description: "Une autonomie qui vous accompagne toute la journée et plus encore.",
                delay: 0.6,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: isFeaturesInView ? 1 : 0,
                  y: isFeaturesInView ? 0 : 30,
                }}
                transition={{ duration: 0.6, delay: feature.delay }}
                className="text-center"
              >
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* iPhone 16 Section */}
      <section ref={iphone16Ref} className="py-20 px-4 md:px-8 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: isIphone16InView ? 1 : 0,
                x: isIphone16InView ? 0 : -50,
              }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">iPhone 16</h2>
              <p className="text-xl text-gray-300 mb-6">Impressionnant par tous les angles.</p>
              <p className="text-gray-400 mb-8">
                Avec son design élégant, son écran Super Retina XDR et sa puce A18 ultra-rapide, l'iPhone 16 redéfinit
                ce qu'un smartphone peut faire.
              </p>
              <Link
                href="/v14/compare?model=iphone16"
                className="text-blue-500 hover:text-blue-400 flex items-center text-lg"
              >
                En savoir plus <ChevronRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: isIphone16InView ? 1 : 0,
                x: isIphone16InView ? 0 : 50,
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:w-1/2 relative h-[400px] w-full"
            >
              <Image src="/placeholder.svg?height=600&width=600" alt="iPhone 16" fill className="object-contain" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* iPhone 16 Pro Section */}
      <section ref={iphone16ProRef} className="py-20 px-4 md:px-8 bg-gradient-to-b from-gray-800 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: isIphone16ProInView ? 1 : 0,
                x: isIphone16ProInView ? 0 : 50,
              }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">iPhone 16 Pro</h2>
              <p className="text-xl text-gray-300 mb-6">Le summum de l'innovation.</p>
              <p className="text-gray-400 mb-8">
                Conçu en titane, doté d'un système photo professionnel et de la puce A18 Pro, l'iPhone 16 Pro repousse
                toutes les limites.
              </p>
              <Link
                href="/v14/compare?model=iphone16pro"
                className="text-blue-500 hover:text-blue-400 flex items-center text-lg"
              >
                En savoir plus <ChevronRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: isIphone16ProInView ? 1 : 0,
                x: isIphone16ProInView ? 0 : -50,
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:w-1/2 relative h-[400px] w-full"
            >
              <Image src="/placeholder.svg?height=600&width=600" alt="iPhone 16 Pro" fill className="object-contain" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Trouvez l'iPhone qui vous correspond
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            Comparez les modèles, choisissez la taille et la finition qui vous conviennent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/v14/compare"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-colors"
            >
              Comparer
            </Link>
            <Link
              href="/v14/checkout"
              className="bg-white hover:bg-gray-200 text-black px-8 py-3 rounded-full transition-colors"
            >
              Acheter
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-8 bg-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-gray-400 font-semibold mb-4">Acheter et découvrir</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/v14/compare" className="text-gray-500 hover:text-white text-sm">
                    iPhone
                  </Link>
                </li>
                <li>
                  <Link href="/v14/price-tracker" className="text-gray-500 hover:text-white text-sm">
                    Comparateur de prix
                  </Link>
                </li>
                <li>
                  <Link href="/v14/checkout" className="text-gray-500 hover:text-white text-sm">
                    Acheter
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-gray-400 font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-500 hover:text-white text-sm">
                    Apple Care
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-white text-sm">
                    Apple Trade In
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-white text-sm">
                    Financement
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-gray-400 font-semibold mb-4">Compte</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/v14/login" className="text-gray-500 hover:text-white text-sm">
                    Gérer votre compte
                  </Link>
                </li>
                <li>
                  <Link href="/v14/account" className="text-gray-500 hover:text-white text-sm">
                    Profil Apple
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-white text-sm">
                    iCloud.com
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-gray-400 font-semibold mb-4">À propos de Pomme</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-500 hover:text-white text-sm">
                    Actualités
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-white text-sm">
                    Événements
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-white text-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-gray-500 text-sm">
            <p>Copyright © {new Date().getFullYear()} Pomme Inc. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

