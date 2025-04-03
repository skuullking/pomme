"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function V14RedirectPage() {
  const router = useRouter()

  // Rediriger automatiquement vers la page d'accueil de la v14
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/v14/home")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Version 14</h1>
      <p className="text-xl text-gray-300 mb-8 text-center">
        Vous allez être redirigé vers la version 14 du site Pomme...
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/v14/home">
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

