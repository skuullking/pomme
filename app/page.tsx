"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import SiteNavigation from "@/components/site-navigation"

// Données des modèles d'iPhone pour la comparaison
const featuredIPhones = [
  {
    id: 1,
    name: "iPhone 16 Pro",
    image: "/placeholder.svg?height=400&width=200",
    price: 1199,
    features: ["Puce A18 Pro", 'Écran 6,3" ProMotion', "Caméra 48MP", "Bouton Action"],
  },
  {
    id: 2,
    name: "iPhone 16",
    image: "/placeholder.svg?height=400&width=200",
    price: 899,
    features: ["Puce A18", 'Écran 6,1"', "Caméra 48MP", "USB-C"],
  },
  {
    id: 3,
    name: "iPhone 15 Pro",
    image: "/placeholder.svg?height=400&width=200",
    price: 999,
    features: ["Puce A17 Pro", 'Écran 6,1" ProMotion', "Caméra 48MP", "Bouton Action"],
  },
]

export default function HomePage() {
  const { isAuthenticated, isGuest, isLoading } = useAuth()
  const [mounted, setMounted] = useState(false)

  // Références pour les animations au scroll
  const heroRef = useRef<HTMLDivElement>(null)
  const compareRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  // Animation au scroll
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.9])
  const heroY = useTransform(scrollY, [0, 400], [0, 100])

  // Vérifier l'authentification et définir mounted à true après le montage du composant
  useEffect(() => {
    setMounted(true)

    if (!isLoading && !isAuthenticated && !isGuest) {
      localStorage.setItem("guestUser", "true")
      window.location.reload()
    }

    // Animation de défilement fluide pour les ancres
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')

      if (anchor) {
        e.preventDefault()
        const targetId = anchor.getAttribute("href")
        if (targetId && targetId !== "#") {
          const targetElement = document.querySelector(targetId)
          if (targetElement) {
            window.scrollTo({
              top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
              behavior: "smooth",
            })
          }
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)
    return () => document.removeEventListener("click", handleAnchorClick)
  }, [isLoading, isAuthenticated, isGuest])

  // Variantes d'animation pour les éléments
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  // Afficher un loader pendant le chargement
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 1.5, ease: "linear", repeat: Number.POSITIVE_INFINITY },
            scale: { duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
          }}
          className="rounded-full h-16 w-16 border-t-2 border-b-2 border-white"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <SiteNavigation />

      {/* Hero Section - Style Apple minimaliste avec animations améliorées */}
      <motion.section
        ref={heroRef}
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY,
        }}
        className="relative pt-20 min-h-screen flex flex-col items-center justify-center overflow-hidden"
        id="hero"
      >
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-7xl font-bold mb-4">iPhone 16 Pro</h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-6">Titane. Si résistant. Si léger. Si Pro.</p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeInUp} custom={0}>
                <Link
                  href="/compare"
                  className="text-gray-300 hover:text-white transition-colors flex items-center text-lg group"
                >
                  <span>En savoir plus</span>
                  <motion.span initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                    <ChevronRight size={16} className="ml-1" />
                  </motion.span>
                </Link>
              </motion.div>
              <motion.div variants={fadeInUp} custom={1}>
                <Link
                  href="/checkout"
                  className="text-gray-300 hover:text-white transition-colors flex items-center text-lg group"
                >
                  <span>Acheter</span>
                  <motion.span initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                    <ChevronRight size={16} className="ml-1" />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.5,
              ease: "easeOut",
            }}
            className="mt-12 flex justify-center"
          >
            <div className="relative h-[500px] w-[250px]">
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
                  src="/placeholder.svg?height=500&width=250"
                  alt="iPhone 16 Pro"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Indicateur de défilement */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-white rounded-full mt-2"
              animate={{ y: [0, 15, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Section Comparaison - Style Apple avec animations */}
      <motion.section ref={compareRef} className="py-20 bg-white text-black" id="compare">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Comparez les modèles d'iPhone</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Trouvez l'iPhone qui vous correspond</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredIPhones.map((iphone, index) => (
              <motion.div
                key={iphone.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="flex flex-col items-center"
              >
                <motion.div
                  className="relative h-64 w-32 mb-6"
                  animate={{
                    rotateY: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                >
                  <Image src={iphone.image || "/placeholder.svg"} alt={iphone.name} fill className="object-contain" />
                </motion.div>
                <h3 className="text-2xl font-semibold mb-2">{iphone.name}</h3>
                <p className="text-xl mb-4">À partir de {iphone.price} €</p>
                <ul className="space-y-2 mb-6">
                  {iphone.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      className="text-center text-gray-600"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i + index * 0.1, duration: 0.5 }}
                    >
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href={`/compare?model=${iphone.id}`}>
                    <button className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                      En savoir plus
                    </button>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/compare">
                <button className="px-8 py-3 border border-black text-black rounded-full hover:bg-gray-100 transition-colors">
                  Comparer tous les modèles
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Section Fonctionnalités - Style Apple avec animations */}
      <motion.section ref={featuresRef} className="py-20 bg-black text-white" id="features">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Pourquoi comparer</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Prenez une décision éclairée pour votre prochain iPhone
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Comparaison détaillée",
                description:
                  "Comparez jusqu'à 4 modèles d'iPhone côte à côte avec toutes leurs spécifications techniques.",
                delay: 0.1,
              },
              {
                title: "Suivi des prix",
                description:
                  "Suivez l'évolution des prix chez différents revendeurs et soyez alerté des meilleures offres.",
                delay: 0.3,
              },
              {
                title: "Conseils d'experts",
                description:
                  "Bénéficiez de nos conseils d'experts pour choisir l'iPhone qui correspond le mieux à vos besoins.",
                delay: 0.5,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: feature.delay }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "12px",
                  transition: { duration: 0.3 },
                }}
                className="text-center p-6"
              >
                <motion.h3
                  className="text-2xl font-semibold mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: feature.delay + 0.2 }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p
                  className="text-gray-400"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: feature.delay + 0.4 }}
                >
                  {feature.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section CTA - Style Apple avec animations */}
      <motion.section ref={ctaRef} className="py-20 bg-white text-black" id="cta">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Prêt à trouver votre iPhone idéal ?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Utilisez notre outil de comparaison pour découvrir l'iPhone qui correspond parfaitement à vos besoins.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link href="/compare">
                <button className="px-8 py-4 bg-black text-white rounded-full font-medium text-lg hover:bg-gray-900 transition-colors">
                  Comparer maintenant
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer - Style Apple */}
      <footer className="py-12 bg-gray-100 text-gray-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-sm font-bold mb-4">Comparer</h3>
              <ul className="space-y-2 text-sm">
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href="/compare" className="hover:text-black transition-colors">
                    Tous les modèles
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href="/compare?model=iphone16pro" className="hover:text-black transition-colors">
                    iPhone 16 Pro
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href="/compare?model=iphone16" className="hover:text-black transition-colors">
                    iPhone 16
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href="/compare?model=iphone15pro" className="hover:text-black transition-colors">
                    iPhone 15 Pro
                  </Link>
                </motion.li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-sm font-bold mb-4">Prix</h3>
              <ul className="space-y-2 text-sm">
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href="/price-tracker" className="hover:text-black transition-colors">
                    Suivi des prix
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href="/price-tracker/alerts" className="hover:text-black transition-colors">
                    Alertes de prix
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href="/price-tracker/history" className="hover:text-black transition-colors">
                    Historique des prix
                  </Link>
                </motion.li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-sm font-bold mb-4">Acheter</h3>
              <ul className="space-y-2 text-sm">
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href="/checkout" className="hover:text-black transition-colors">
                    Commander
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href="/checkout/financing" className="hover:text-black transition-colors">
                    Financement
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href="/checkout/trade-in" className="hover:text-black transition-colors">
                    Reprise
                  </Link>
                </motion.li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-sm font-bold mb-4">À propos</h3>
              <ul className="space-y-2 text-sm">
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href="/about" className="hover:text-black transition-colors">
                    Notre service
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href="/contact" className="hover:text-black transition-colors">
                    Contact
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href="/privacy" className="hover:text-black transition-colors">
                    Confidentialité
                  </Link>
                </motion.li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            className="pt-8 border-t border-gray-300 text-center text-xs"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p>© {new Date().getFullYear()} iCompare. Tous droits réservés.</p>
            <p className="mt-2">iCompare n'est pas affilié à Apple Inc.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

