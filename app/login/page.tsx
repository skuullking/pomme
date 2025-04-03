"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import SiteNavigation from "@/components/site-navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()
  const { login, isAuthenticated, isGuest } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)

    // Redirect if already authenticated and not guest
    if (isAuthenticated && !isGuest) {
      router.push("/account")
    }
  }, [isAuthenticated, isGuest, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(email, password)

      if (success) {
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté",
        })
        router.push("/account")
      } else {
        toast({
          title: "Échec de la connexion",
          description: "Email ou mot de passe incorrect",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNavigation />

      <main className="pt-20 pb-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md px-4"
        >
          <Card className="bg-gray-900 border-gray-800 text-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Connexion</CardTitle>
              <CardDescription className="text-center text-gray-400">
                Connectez-vous à votre compte Pomme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="exemple@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-gray-300">
                        Mot de passe
                      </Label>
                      <Link href="#" className="text-sm text-blue-500 hover:underline">
                        Mot de passe oublié?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                    {isLoading ? "Connexion en cours..." : "Se connecter"}
                  </Button>
                </div>
              </form>
              <div className="mt-4 text-center text-sm text-gray-400">
                Vous n'avez pas de compte?{" "}
                <Link href="/register" className="text-blue-500 hover:underline">
                  S'inscrire
                </Link>
              </div>
              <div className="mt-2 text-center text-sm">
                <Link href="/account-access" className="text-gray-500 hover:underline">
                  Retour aux options de connexion
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center text-sm text-gray-500">
              © {new Date().getFullYear()} Pomme Inc. Tous droits réservés.
            </CardFooter>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

