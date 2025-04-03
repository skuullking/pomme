"use client"

import { Button } from "@/components/ui/button"
import { CustomButton } from "@/components/custom-button"
import SiteNavigation from "@/components/site-navigation"
import { ShoppingCart, ArrowRight, Download, Check } from "lucide-react"

export default function ButtonExamplesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNavigation />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">Exemples de Boutons</h1>

          <div className="grid gap-12">
            {/* Boutons shadcn améliorés */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Boutons shadcn améliorés</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium mb-2">Variantes</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button>Default</Button>
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button variant="accent">Accent</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium mb-2">Tailles</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button>Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">
                      <ShoppingCart size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Boutons personnalisés style Apple */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Boutons personnalisés style Apple</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium mb-2">Variantes</h3>
                  <div className="flex flex-wrap gap-4">
                    <CustomButton variant="primary">Primary</CustomButton>
                    <CustomButton variant="outline">Outline</CustomButton>
                    <CustomButton variant="dark">Dark</CustomButton>
                    <CustomButton variant="light">Light</CustomButton>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium mb-2">Tailles</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <CustomButton size="sm">Small</CustomButton>
                    <CustomButton size="md">Medium</CustomButton>
                    <CustomButton size="lg">Large</CustomButton>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-medium mb-2">Avec icônes</h3>
                <div className="flex flex-wrap gap-4">
                  <CustomButton icon={<ShoppingCart size={16} />}>Acheter</CustomButton>
                  <CustomButton variant="outline" icon={<ArrowRight size={16} />}>
                    Continuer
                  </CustomButton>
                  <CustomButton variant="dark" icon={<Download size={16} />}>
                    Télécharger
                  </CustomButton>
                  <CustomButton variant="light" icon={<Check size={16} />}>
                    Confirmer
                  </CustomButton>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-medium mb-2">États</h3>
                <div className="flex flex-wrap gap-4">
                  <CustomButton isLoading>Chargement</CustomButton>
                  <CustomButton disabled>Désactivé</CustomButton>
                  <CustomButton fullWidth>Pleine largeur</CustomButton>
                </div>
              </div>
            </section>

            {/* Exemples d'utilisation */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Exemples d'utilisation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-900 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Carte produit</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">iPhone 16 Pro</p>
                      <p className="text-gray-400">À partir de 1099€</p>
                    </div>
                    <CustomButton variant="primary" size="sm" icon={<ShoppingCart size={14} />}>
                      Acheter
                    </CustomButton>
                  </div>
                </div>

                <div className="bg-gray-900 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Appel à l'action</h3>
                  <p className="text-gray-400 mb-4">
                    Découvrez notre nouveau modèle phare avec des performances inégalées.
                  </p>
                  <div className="flex gap-3">
                    <CustomButton variant="primary">En savoir plus</CustomButton>
                    <CustomButton variant="outline">Comparer</CustomButton>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

