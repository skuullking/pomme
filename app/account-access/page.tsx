"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { LogIn, UserPlus } from "lucide-react"
import SiteNavigation from "@/components/site-navigation"
import { useAuth } from "@/hooks/use-auth"

export default function AccountAccessPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading, isGuest } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)

  // Rediriger vers l'espace compte si déjà connecté
  useEffect(() => {
    setMounted(true)

    if (!isLoading && isAuthenticated && !isGuest) {
      router.push("/account")
    }
  }, [isLoading, isAuthenticated, isGuest, router])

  // Variantes d'animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut", // Remplacé la fonction cubic-bezier par "easeOut"
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  // Afficher un loader pendant la vérification
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <SiteNavigation />
        <div className="flex items-center justify-center h-screen">
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
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNavigation />

      <AnimatePresence>
        {mounted && (
          <motion.main
            className="pt-20 pb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="container mx-auto px-4 max-w-md">
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h1 className="text-3xl font-bold mb-4">Accès à votre espace personnel</h1>
                <p className="text-gray-400">Connectez-vous ou créez un compte pour accéder à votre espace personnel</p>
              </motion.div>

              <div className="space-y-6">
                {/* Option 1: Se connecter */}
                <motion.div
                  variants={itemVariants}
                  className={`relative overflow-hidden bg-gray-900 border border-gray-800 rounded-xl p-6 hover:bg-gray-800 transition-colors ${
                    hoveredOption === "login" ? "bg-gray-800 border-gray-700" : ""
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setHoveredOption("login")}
                  onHoverEnd={() => setHoveredOption(null)}
                >
                  <Link href="/login" className="flex items-center">
                    <div className="bg-blue-600 rounded-full p-3 mr-4">
                      <LogIn className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-1">Se connecter</h2>
                      <p className="text-gray-400 text-sm">Accédez à votre compte existant</p>
                    </div>
                  </Link>

                  {/* Effet de brillance au survol */}
                  {hoveredOption === "login" && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800/10 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                    />
                  )}
                </motion.div>

                {/* Option 2: Créer un compte */}
                <motion.div
                  variants={itemVariants}
                  className={`relative overflow-hidden bg-gray-900 border border-gray-800 rounded-xl p-6 hover:bg-gray-800 transition-colors ${
                    hoveredOption === "register" ? "bg-gray-800 border-gray-700" : ""
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setHoveredOption("register")}
                  onHoverEnd={() => setHoveredOption(null)}
                >
                  <Link href="/register" className="flex items-center">
                    <div className="bg-gray-700 rounded-full p-3 mr-4">
                      <UserPlus className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-1">Créer un compte</h2>
                      <p className="text-gray-400 text-sm">Inscrivez-vous pour profiter de tous les avantages</p>
                    </div>
                  </Link>

                  {/* Effet de brillance au survol */}
                  {hoveredOption === "register" && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800/10 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                    />
                  )}
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="mt-12 text-center">
                <p className="text-gray-500 text-sm">
                  En vous connectant, vous acceptez nos{" "}
                  <Link href="/terms" className="text-blue-500 hover:underline">
                    Conditions d'utilisation
                  </Link>{" "}
                  et notre{" "}
                  <Link href="/privacy" className="text-blue-500 hover:underline">
                    Politique de confidentialité
                  </Link>
                </p>
              </motion.div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-gray-500 text-sm"
          >
            © {new Date().getFullYear()} Pomme Inc. Tous droits réservés.
          </motion.p>
        </div>
      </footer>
    </div>
  )
}

