"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDown, ArrowUp, Bell, ExternalLink } from "lucide-react"
import SiteNavigation from "@/components/site-navigation"

// Données fictives pour les prix actuels
const currentPrices = [
  { model: "iPhone 16 Pro Max", apple: 1299, amazon: 1249, fnac: 1279, darty: 1289, available: true },
  { model: "iPhone 16 Pro", apple: 1099, amazon: 1069, fnac: 1089, darty: 1079, available: true },
  { model: "iPhone 16", apple: 899, amazon: 879, fnac: 889, darty: 899, available: true },
  { model: "iPhone 15 Pro", apple: 999, amazon: 949, fnac: 969, darty: 979, available: true },
  { model: "iPhone 15", apple: 799, amazon: 749, fnac: 779, darty: 789, available: true },
  { model: "iPhone 14 Pro", apple: 899, amazon: 849, fnac: 869, darty: 879, available: true },
  { model: "iPhone 14", apple: 699, amazon: 649, fnac: 679, darty: 689, available: true },
  { model: "iPhone 13", apple: 599, amazon: 549, fnac: 579, darty: 589, available: true },
]

// Données fictives pour l'historique des prix
const priceHistory = [
  { model: "iPhone 16 Pro Max", date: "01/09/2024", apple: 1299, amazon: 1299, fnac: 1299, darty: 1299 },
  { model: "iPhone 16 Pro Max", date: "15/09/2024", apple: 1299, amazon: 1279, fnac: 1289, darty: 1299 },
  { model: "iPhone 16 Pro Max", date: "01/10/2024", apple: 1299, amazon: 1259, fnac: 1279, darty: 1289 },
  { model: "iPhone 16 Pro Max", date: "15/10/2024", apple: 1299, amazon: 1249, fnac: 1279, darty: 1289 },
]

// Données fictives pour les alertes de prix
const priceAlerts = [
  { model: "iPhone 16 Pro", targetPrice: 999, currentPrice: 1069, store: "Amazon" },
  { model: "iPhone 15 Pro", targetPrice: 899, currentPrice: 949, store: "Amazon" },
]

export default function PriceTrackerPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("current")
  const [selectedModel, setSelectedModel] = useState("all")

  useEffect(() => {
    setMounted(true)
  }, [])

  // Filtrer les modèles en fonction de la sélection
  const filteredPrices =
    selectedModel === "all" ? currentPrices : currentPrices.filter((item) => item.model === selectedModel)

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
      },
    },
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNavigation />

      <main className="pt-16 pb-24">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <motion.div variants={itemVariants} className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Comparateur de Prix iPhone
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Suivez l'évolution des prix et comparez les offres des différents revendeurs
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              className="mb-8"
            >
              <Tabs defaultValue="current" className="w-full" onValueChange={setActiveTab} value={activeTab}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <TabsList className="bg-gray-800 p-1">
                    <TabsTrigger
                      value="current"
                      className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    >
                      Prix actuels
                    </TabsTrigger>
                    <TabsTrigger
                      value="history"
                      className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    >
                      Historique
                    </TabsTrigger>
                    <TabsTrigger
                      value="alerts"
                      className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    >
                      Alertes
                    </TabsTrigger>
                  </TabsList>

                  {activeTab === "current" && (
                    <div className="flex items-center">
                      <label htmlFor="model-filter" className="mr-2 text-sm text-gray-400">
                        Modèle:
                      </label>
                      <select
                        id="model-filter"
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1 text-sm"
                      >
                        <option value="all">Tous les modèles</option>
                        {currentPrices.map((item) => (
                          <option key={item.model} value={item.model}>
                            {item.model}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <TabsContent value="current" className="mt-0">
                  <Card className="bg-gray-900 border-gray-800 text-white">
                    <CardHeader>
                      <CardTitle>Comparaison des prix actuels</CardTitle>
                      <CardDescription className="text-gray-400">
                        Prix des différents modèles d'iPhone chez les principaux revendeurs
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b border-gray-800">
                              <th className="py-3 px-4 text-left">Modèle</th>
                              <th className="py-3 px-4 text-right">Apple</th>
                              <th className="py-3 px-4 text-right">Amazon</th>
                              <th className="py-3 px-4 text-right">Fnac</th>
                              <th className="py-3 px-4 text-right">Darty</th>
                              <th className="py-3 px-4 text-center">Meilleur prix</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredPrices.map((item, index) => {
                              const minPrice = Math.min(item.apple, item.amazon, item.fnac, item.darty)
                              return (
                                <motion.tr
                                  key={index}
                                  className={index % 2 === 0 ? "bg-gray-800/30" : ""}
                                  variants={itemVariants}
                                >
                                  <td className="py-3 px-4 font-medium">{item.model}</td>
                                  <td className="py-3 px-4 text-right">
                                    {item.apple === minPrice ? (
                                      <span className="font-bold text-green-500">{item.apple}€</span>
                                    ) : (
                                      `${item.apple}€`
                                    )}
                                  </td>
                                  <td className="py-3 px-4 text-right">
                                    {item.amazon === minPrice ? (
                                      <span className="font-bold text-green-500">{item.amazon}€</span>
                                    ) : (
                                      `${item.amazon}€`
                                    )}
                                  </td>
                                  <td className="py-3 px-4 text-right">
                                    {item.fnac === minPrice ? (
                                      <span className="font-bold text-green-500">{item.fnac}€</span>
                                    ) : (
                                      `${item.fnac}€`
                                    )}
                                  </td>
                                  <td className="py-3 px-4 text-right">
                                    {item.darty === minPrice ? (
                                      <span className="font-bold text-green-500">{item.darty}€</span>
                                    ) : (
                                      `${item.darty}€`
                                    )}
                                  </td>
                                  <td className="py-3 px-4 text-center">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-xs border-gray-700 hover:bg-gray-800"
                                    >
                                      <ExternalLink size={12} className="mr-1" />
                                      Voir offre
                                    </Button>
                                  </td>
                                </motion.tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-6 text-sm text-gray-500">
                        <p>
                          <strong>Note :</strong> Les prix sont mis à jour quotidiennement. Dernière mise à jour :{" "}
                          {new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history" className="mt-0">
                  <Card className="bg-gray-900 border-gray-800 text-white">
                    <CardHeader>
                      <CardTitle>Historique des prix</CardTitle>
                      <CardDescription className="text-gray-400">
                        Évolution des prix de l'iPhone 16 Pro Max au cours des derniers mois
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b border-gray-800">
                              <th className="py-3 px-4 text-left">Date</th>
                              <th className="py-3 px-4 text-right">Apple</th>
                              <th className="py-3 px-4 text-right">Amazon</th>
                              <th className="py-3 px-4 text-right">Fnac</th>
                              <th className="py-3 px-4 text-right">Darty</th>
                              <th className="py-3 px-4 text-center">Évolution</th>
                            </tr>
                          </thead>
                          <tbody>
                            {priceHistory.map((item, index) => {
                              const prevItem = index < priceHistory.length - 1 ? priceHistory[index + 1] : null
                              const amazonDiff = prevItem ? item.amazon - prevItem.amazon : 0

                              return (
                                <motion.tr
                                  key={index}
                                  className={index % 2 === 0 ? "bg-gray-800/30" : ""}
                                  variants={itemVariants}
                                >
                                  <td className="py-3 px-4 font-medium">{item.date}</td>
                                  <td className="py-3 px-4 text-right">{item.apple}€</td>
                                  <td className="py-3 px-4 text-right">{item.amazon}€</td>
                                  <td className="py-3 px-4 text-right">{item.fnac}€</td>
                                  <td className="py-3 px-4 text-right">{item.darty}€</td>
                                  <td className="py-3 px-4 text-center">
                                    {amazonDiff > 0 ? (
                                      <span className="text-red-500 flex items-center justify-center">
                                        <ArrowUp size={14} className="mr-1" />
                                        {amazonDiff}€
                                      </span>
                                    ) : amazonDiff < 0 ? (
                                      <span className="text-green-500 flex items-center justify-center">
                                        <ArrowDown size={14} className="mr-1" />
                                        {Math.abs(amazonDiff)}€
                                      </span>
                                    ) : (
                                      <span className="text-gray-400">-</span>
                                    )}
                                  </td>
                                </motion.tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-6 text-sm text-gray-500">
                        <p>
                          <strong>Note :</strong> L'historique affiche les variations de prix sur Amazon pour l'iPhone
                          16 Pro Max.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="alerts" className="mt-0">
                  <Card className="bg-gray-900 border-gray-800 text-white">
                    <CardHeader>
                      <CardTitle>Alertes de prix</CardTitle>
                      <CardDescription className="text-gray-400">
                        Recevez une notification lorsque le prix d'un iPhone atteint votre cible
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        {priceAlerts.map((alert, index) => (
                          <motion.div
                            key={index}
                            className="border border-gray-800 rounded-lg p-4"
                            variants={itemVariants}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-lg">{alert.model}</h3>
                                <p className="text-gray-400 text-sm">Chez {alert.store}</p>
                                <div className="mt-2 flex items-center">
                                  <span className="text-gray-400 text-sm mr-2">Prix actuel:</span>
                                  <span className="font-medium">{alert.currentPrice}€</span>
                                </div>
                                <div className="mt-1 flex items-center">
                                  <span className="text-gray-400 text-sm mr-2">Prix cible:</span>
                                  <span className="font-medium text-green-500">{alert.targetPrice}€</span>
                                </div>
                                <div className="mt-2 text-sm text-gray-400">
                                  Différence:{" "}
                                  <span className="text-red-500">{alert.currentPrice - alert.targetPrice}€</span>
                                </div>
                              </div>
                              <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-800">
                                <Bell size={14} className="mr-2" />
                                Modifier
                              </Button>
                            </div>
                            <div className="mt-3 w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-blue-600 h-full rounded-full"
                                style={{
                                  width: `${Math.min(100, (alert.targetPrice / alert.currentPrice) * 100)}%`,
                                }}
                              ></div>
                            </div>
                          </motion.div>
                        ))}

                        <motion.div
                          className="border border-dashed border-gray-700 rounded-lg p-4 text-center hover:bg-gray-800/30 transition-colors cursor-pointer"
                          variants={itemVariants}
                        >
                          <Bell size={24} className="mx-auto mb-2 text-gray-500" />
                          <p className="text-gray-400">Créer une nouvelle alerte de prix</p>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              className="mt-12 text-center"
            >
              <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-4">
                Pourquoi utiliser notre comparateur de prix ?
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <motion.div variants={itemVariants} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                  <div className="rounded-full bg-blue-600/20 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-500"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-center">Économisez de l'argent</h3>
                  <p className="text-gray-400 text-center">
                    Trouvez les meilleures offres et économisez jusqu'à 15% sur votre prochain iPhone.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                  <div className="rounded-full bg-blue-600/20 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-500"
                    >
                      <path d="M3 3v18h18" />
                      <path d="m19 9-5 5-4-4-3 3" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-center">Suivez les tendances</h3>
                  <p className="text-gray-400 text-center">
                    Surveillez l'évolution des prix et achetez au moment le plus opportun.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                  <div className="rounded-full bg-blue-600/20 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-500"
                    >
                      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-center">Alertes personnalisées</h3>
                  <p className="text-gray-400 text-center">
                    Créez des alertes et soyez notifié dès que le prix atteint votre objectif.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Pomme Inc. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}

