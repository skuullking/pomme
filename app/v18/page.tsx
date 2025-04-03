"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function V18RedirectPage() {
  const router = useRouter()

  // Rediriger directement vers la page d'accueil sans délai
  useEffect(() => {
    // Définir l'utilisateur comme invité par défaut pour éviter les problèmes
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
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Version 18</h1>
      <p className="text-xl text-gray-300 mb-8 text-center">
        Vous allez être redirigé vers la version 18 du site Pomme...
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/v18/home">
          <Button className="bg-blue-600 hover:bg-blue-700">Accéder maintenant</Button>
        </Link>
        <Link href="/">
          <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
            Retourner à l'accueil
          </Button>
        </Link>
      </div>
    </div>
  )
}

