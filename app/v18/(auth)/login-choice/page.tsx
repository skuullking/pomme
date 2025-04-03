"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, User, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LoginChoicePage() {
  const router = useRouter()
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)

  const handleContinueAsGuest = () => {
    // Définir un état invité dans le localStorage
    localStorage.setItem("guestUser_v18", "true")

    // Créer un utilisateur invité fictif
    const guestUser = {
      id: "guest",
      email: "guest@example.com",
      firstName: "Utilisateur",
      lastName: "Invité",
    }

    // Stocker l'utilisateur invité dans localStorage
    localStorage.setItem("user_v18", JSON.stringify(guestUser))

    // Rediriger vers la page d'accueil
    router.push("/v18/home")
  }

  const handleLoginWithAccount = () => {
    // Rediriger vers la page de connexion
    router.push("/v18/login")
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Logo Apple en haut */}
      <div className="container mx-auto pt-8 pb-4">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10"
          >
            <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
            <path d="M10 2c1 .5 2 2 2 5" />
          </svg>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Bienvenue chez Pomme</h1>

          <p className="text-gray-400 text-center mb-12">Choisissez comment vous souhaitez continuer</p>

          <div className="space-y-6">
            {/* Option 1: Se connecter avec un compte */}
            <motion.div
              className={`relative overflow-hidden rounded-xl border border-gray-800 p-6 cursor-pointer transition-all duration-300 ${
                hoveredOption === "account" ? "bg-gray-900 border-gray-700" : "bg-gray-950"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHoveredOption("account")}
              onHoverEnd={() => setHoveredOption(null)}
              onClick={handleLoginWithAccount}
            >
              <div className="flex items-center">
                <div className="bg-blue-600 rounded-full p-3 mr-4">
                  <User className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-1">Se connecter</h2>
                  <p className="text-gray-400 text-sm">Accédez à votre compte et à vos préférences</p>
                </div>
                <ArrowRight
                  className={`h-5 w-5 transition-opacity duration-300 ${
                    hoveredOption === "account" ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>

              {/* Effet de brillance au survol */}
              {hoveredOption === "account" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800/10 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                />
              )}
            </motion.div>

            {/* Option 2: Continuer en tant qu'invité */}
            <motion.div
              className={`relative overflow-hidden rounded-xl border border-gray-800 p-6 cursor-pointer transition-all duration-300 ${
                hoveredOption === "guest" ? "bg-gray-900 border-gray-700" : "bg-gray-950"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHoveredOption("guest")}
              onHoverEnd={() => setHoveredOption(null)}
              onClick={handleContinueAsGuest}
            >
              <div className="flex items-center">
                <div className="bg-gray-700 rounded-full p-3 mr-4">
                  <UserPlus className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-1">Continuer en tant qu'invité</h2>
                  <p className="text-gray-400 text-sm">Explorez nos produits sans vous connecter</p>
                </div>
                <ArrowRight
                  className={`h-5 w-5 transition-opacity duration-300 ${
                    hoveredOption === "guest" ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>

              {/* Effet de brillance au survol */}
              {hoveredOption === "guest" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800/10 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                />
              )}
            </motion.div>
          </div>

          {/* Créer un compte */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Vous n'avez pas encore de compte ?</p>
            <Link href="/v18/register">
              <Button variant="outline" className="border-gray-700 hover:bg-gray-900 text-white">
                Créer un compte
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Pied de page */}
      <div className="container mx-auto py-8">
        <div className="text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Pomme Inc. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  )
}

