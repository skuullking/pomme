"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import SiteNavigation from "@/components/site-navigation"

export default function AccountPage() {
  const { user, isAuthenticated, isLoading, isGuest, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    // Redirect if not authenticated or is guest
    if (!isLoading && (!isAuthenticated || isGuest)) {
      router.push("/account-access")
    }

    // Set user data if authenticated
    if (user) {
      setFirstName(user.firstName || "")
      setLastName(user.lastName || "")
      setEmail(user.email || "")
      setPhone("+33 6 12 34 56 78") // Example data
    }
  }, [isLoading, isAuthenticated, isGuest, router, user])

  const handleSaveProfile = () => {
    // Animation de sauvegarde
    if (profileRef.current) {
      profileRef.current.classList.add("pulse-animation")
      setTimeout(() => {
        if (profileRef.current) {
          profileRef.current.classList.remove("pulse-animation")
        }
      }, 1000)
    }

    // In a real app, this would update the user profile via API
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès",
    })
  }

  const handleUpdatePassword = () => {
    // In a real app, this would update the password via API
    toast({
      title: "Mot de passe mis à jour",
      description: "Votre mot de passe a été modifié avec succès",
    })
  }

  const handleSavePreferences = () => {
    // In a real app, this would update preferences via API
    toast({
      title: "Préférences enregistrées",
      description: "Vos préférences ont été mises à jour",
    })
  }

  const handleLogout = () => {
    logout()
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès",
    })
    router.push("/")
  }

  // Variantes d'animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
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
  }

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut", // Remplacé la fonction cubic-bezier par "easeOut"
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.2,
      },
    },
  }

  if (isLoading || !mounted) {
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

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center mb-12">
            <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-2">
              Votre espace personnel
            </motion.h1>
            <motion.p variants={itemVariants} className="text-gray-400">
              Gérez votre compte et vos préférences
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8 max-w-6xl mx-auto"
          >
            {/* Sidebar */}
            <motion.div variants={itemVariants}>
              <Card className="h-fit bg-gray-900 border-gray-800 text-white">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/placeholder.svg" alt="Avatar" />
                        <AvatarFallback className="bg-blue-600 text-white">
                          {user?.firstName?.charAt(0)}
                          {user?.lastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="text-center"
                    >
                      <h2 className="text-xl font-bold">
                        {user?.firstName} {user?.lastName}
                      </h2>
                      <p className="text-sm text-gray-400">{user?.email}</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                      <Button
                        variant="outline"
                        className="w-full border-gray-700 text-white hover:bg-gray-800"
                        onClick={handleLogout}
                      >
                        Se déconnecter
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main content */}
            <motion.div variants={itemVariants}>
              <Tabs defaultValue="profile" className="w-full" onValueChange={setActiveTab} value={activeTab}>
                <TabsList className="grid w-full max-w-md grid-cols-3 mb-8 bg-gray-800">
                  <TabsTrigger
                    value="profile"
                    className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                  >
                    Profil
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                  >
                    Sécurité
                  </TabsTrigger>
                  <TabsTrigger
                    value="preferences"
                    className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                  >
                    Préférences
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  {activeTab === "profile" && (
                    <motion.div key="profile" variants={tabVariants} initial="hidden" animate="visible" exit="exit">
                      <TabsContent value="profile" forceMount>
                        <Card className="bg-gray-900 border-gray-800 text-white" ref={profileRef}>
                          <CardHeader>
                            <CardTitle>Informations personnelles</CardTitle>
                            <CardDescription className="text-gray-400">
                              Mettez à jour vos informations personnelles
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="first-name" className="text-gray-300">
                                  Prénom
                                </Label>
                                <Input
                                  id="first-name"
                                  value={firstName}
                                  onChange={(e) => setFirstName(e.target.value)}
                                  className="bg-gray-800 border-gray-700 text-white"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="last-name" className="text-gray-300">
                                  Nom
                                </Label>
                                <Input
                                  id="last-name"
                                  value={lastName}
                                  onChange={(e) => setLastName(e.target.value)}
                                  className="bg-gray-800 border-gray-700 text-white"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email" className="text-gray-300">
                                Email
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-800 border-gray-700 text-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone" className="text-gray-300">
                                Téléphone
                              </Label>
                              <Input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="bg-gray-800 border-gray-700 text-white"
                              />
                            </div>
                          </CardContent>
                          <CardFooter>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button onClick={handleSaveProfile} className="bg-blue-600 hover:bg-blue-700">
                                Enregistrer les modifications
                              </Button>
                            </motion.div>
                          </CardFooter>
                        </Card>
                      </TabsContent>
                    </motion.div>
                  )}

                  {activeTab === "security" && (
                    <motion.div key="security" variants={tabVariants} initial="hidden" animate="visible" exit="exit">
                      <TabsContent value="security" forceMount>
                        <Card className="bg-gray-900 border-gray-800 text-white">
                          <CardHeader>
                            <CardTitle>Sécurité du compte</CardTitle>
                            <CardDescription className="text-gray-400">
                              Gérez votre mot de passe et la sécurité de votre compte
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="current-password" className="text-gray-300">
                                Mot de passe actuel
                              </Label>
                              <Input
                                id="current-password"
                                type="password"
                                className="bg-gray-800 border-gray-700 text-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="new-password" className="text-gray-300">
                                Nouveau mot de passe
                              </Label>
                              <Input
                                id="new-password"
                                type="password"
                                className="bg-gray-800 border-gray-700 text-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="confirm-password" className="text-gray-300">
                                Confirmer le mot de passe
                              </Label>
                              <Input
                                id="confirm-password"
                                type="password"
                                className="bg-gray-800 border-gray-700 text-white"
                              />
                            </div>
                          </CardContent>
                          <CardFooter>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button onClick={handleUpdatePassword} className="bg-blue-600 hover:bg-blue-700">
                                Mettre à jour le mot de passe
                              </Button>
                            </motion.div>
                          </CardFooter>
                        </Card>
                      </TabsContent>
                    </motion.div>
                  )}

                  {activeTab === "preferences" && (
                    <motion.div key="preferences" variants={tabVariants} initial="hidden" animate="visible" exit="exit">
                      <TabsContent value="preferences" forceMount>
                        <Card className="bg-gray-900 border-gray-800 text-white">
                          <CardHeader>
                            <CardTitle>Préférences</CardTitle>
                            <CardDescription className="text-gray-400">Personnalisez votre expérience</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="language" className="text-gray-300">
                                Langue
                              </Label>
                              <select
                                id="language"
                                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                              >
                                <option value="fr">Français</option>
                                <option value="en">English</option>
                                <option value="es">Español</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="currency" className="text-gray-300">
                                Devise
                              </Label>
                              <select
                                id="currency"
                                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                              >
                                <option value="eur">Euro (€)</option>
                                <option value="usd">Dollar ($)</option>
                                <option value="gbp">Livre Sterling (£)</option>
                              </select>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="notifications"
                                className="rounded border-gray-700 bg-gray-800"
                              />
                              <Label htmlFor="notifications" className="text-gray-300">
                                Recevoir des notifications par email
                              </Label>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button onClick={handleSavePreferences} className="bg-blue-600 hover:bg-blue-700">
                                Enregistrer les préférences
                              </Button>
                            </motion.div>
                          </CardFooter>
                        </Card>
                      </TabsContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Tabs>
            </motion.div>
          </motion.div>
        </div>
      </main>

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

