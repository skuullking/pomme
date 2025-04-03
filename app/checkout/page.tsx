"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, CreditCard, Truck, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import SiteNavigation from "@/components/site-navigation"

// Types
type ProductOption = {
  id: string
  name: string
  price: number
}

type StorageOption = {
  id: string
  name: string
  capacity: string
  priceModifier: number
}

type Product = {
  id: string
  name: string
  image: string
  basePrice: number
  selectedColor: string
  selectedStorage: StorageOption
  selectedOptions: Record<string, ProductOption>
}

export default function CheckoutPage() {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [mounted, setMounted] = useState(false)

  // Options disponibles
  const colorOptions = [
    { id: "titanium-natural", name: "Titane naturel" },
    { id: "titanium-blue", name: "Titane bleu" },
    { id: "titanium-white", name: "Titane blanc" },
    { id: "titanium-black", name: "Titane graphite" },
  ]

  const storageOptions: StorageOption[] = [
    { id: "128gb", name: "128 Go", capacity: "128GB", priceModifier: -100 },
    { id: "256gb", name: "256 Go", capacity: "256GB", priceModifier: 0 },
    { id: "512gb", name: "512 Go", capacity: "512GB", priceModifier: 200 },
    { id: "1tb", name: "1 To", capacity: "1TB", priceModifier: 400 },
  ]

  const appleCareOptions = [
    { id: "none", name: "Aucune protection", price: 0 },
    { id: "applecare", name: "AppleCare+ (2 ans)", price: 199 },
    { id: "applecare-theft", name: "AppleCare+ avec protection contre le vol (2 ans)", price: 269 },
  ]

  const [product, setProduct] = useState<Product>({
    id: "iphone-16-pro",
    name: "iPhone 16 Pro",
    image: "/placeholder.svg?height=400&width=200",
    basePrice: 1099,
    selectedColor: "Titane graphite",
    selectedStorage: storageOptions[1], // 256 Go par défaut
    selectedOptions: {
      applecare: { id: "none", name: "Aucune protection", price: 0 },
    },
  })

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France",
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculer le prix total de manière dynamique
  const calculateTotal = useMemo(() => {
    let total = product.basePrice

    // Ajouter le modificateur de prix du stockage
    total += product.selectedStorage.priceModifier

    // Ajouter le prix des options
    Object.values(product.selectedOptions).forEach((option) => {
      total += option.price
    })

    return total
  }, [product])

  // Calculer le prix mensuel
  const calculateMonthlyPrice = useMemo(() => {
    return (calculateTotal / 12).toFixed(2)
  }, [calculateTotal])

  // Gérer le changement de couleur
  const handleColorChange = (color: string) => {
    setProduct((prev) => ({
      ...prev,
      selectedColor: color,
    }))
  }

  // Gérer le changement de stockage
  const handleStorageChange = (storage: StorageOption) => {
    setProduct((prev) => ({
      ...prev,
      selectedStorage: storage,
    }))
  }

  // Gérer le changement d'option
  const handleOptionChange = (category: string, option: ProductOption) => {
    setProduct((prev) => ({
      ...prev,
      selectedOptions: {
        ...prev.selectedOptions,
        [category]: option,
      },
    }))
  }

  // Gérer le changement d'étape
  const handleNextStep = () => {
    if (step === 1) {
      setStep(2)
      window.scrollTo(0, 0)
    } else if (step === 2) {
      // Vérifier que tous les champs sont remplis
      const requiredFields = ["firstName", "lastName", "email", "phone", "address", "city", "postalCode"]
      const missingFields = requiredFields.filter((field) => !shippingInfo[field as keyof typeof shippingInfo])

      if (missingFields.length > 0) {
        toast({
          title: "Informations manquantes",
          description: "Veuillez remplir tous les champs obligatoires.",
          variant: "destructive",
        })
        return
      }

      setStep(3)
      window.scrollTo(0, 0)
    } else if (step === 3) {
      // Vérifier que tous les champs sont remplis
      const requiredFields = ["cardNumber", "cardName", "expiryDate", "cvv"]
      const missingFields = requiredFields.filter((field) => !paymentInfo[field as keyof typeof paymentInfo])

      if (missingFields.length > 0) {
        toast({
          title: "Informations manquantes",
          description: "Veuillez remplir tous les champs de paiement obligatoires.",
          variant: "destructive",
        })
        return
      }

      // Simuler le traitement du paiement
      setIsProcessing(true)

      setTimeout(() => {
        setIsProcessing(false)
        setOrderComplete(true)
        setStep(4)
        window.scrollTo(0, 0)
      }, 2000)
    }
  }

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  // Mettre à jour les informations de livraison
  const updateShippingInfo = (field: string, value: string) => {
    setShippingInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Mettre à jour les informations de paiement
  const updatePaymentInfo = (field: string, value: string) => {
    setPaymentInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Formater le numéro de carte
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Formater la date d'expiration
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return value
  }

  return (
    <div className="min-h-screen bg-white">
      <SiteNavigation />

      <main className="pt-16 pb-24">
        {/* Étape 4: Confirmation de commande */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto px-4 py-16 text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>

              <h1 className="text-3xl font-bold mb-4">Merci pour votre commande !</h1>
              <p className="text-gray-600 mb-8">Votre commande a été confirmée et sera expédiée prochainement.</p>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h2 className="text-lg font-semibold mb-4">Récapitulatif de la commande</h2>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-16 h-16 relative mr-4">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">
                        {product.selectedColor}, {product.selectedStorage.name}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">{calculateTotal} €</p>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Sous-total</span>
                    <span>{calculateTotal} €</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Livraison</span>
                    <span>Gratuite</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t border-gray-200">
                    <span>Total</span>
                    <span>{calculateTotal} €</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Retour à l'accueil
                  </Button>
                </Link>
                <Link href="/account">
                  <Button className="w-full sm:w-auto">Suivre ma commande</Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}

        {step < 4 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Étapes de progression */}
            <div className="mb-10 pt-10">
              <div className="flex justify-between items-center max-w-2xl mx-auto">
                {["Produit", "Livraison", "Paiement"].map((stepName, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index + 1 < step
                          ? "bg-blue-600 text-white"
                          : index + 1 === step
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {index + 1 < step ? <Check size={16} /> : index + 1}
                    </div>
                    <span
                      className={`text-sm mt-2 ${index + 1 <= step ? "text-blue-600 font-medium" : "text-gray-500"}`}
                    >
                      {stepName}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative max-w-2xl mx-auto mt-2">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>
                <div
                  className="absolute top-1/2 left-0 h-0.5 bg-blue-600 -translate-y-1/2 transition-all duration-300"
                  style={{ width: `${(step - 1) * 50}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Contenu principal */}
              <div className="lg:col-span-2">
                {/* Étape 1: Sélection du produit */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h1 className="text-2xl font-bold mb-6">Personnalisez votre iPhone</h1>

                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 mb-6 md:mb-0">
                          <div className="relative h-64 w-full">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                        <div className="md:w-2/3 md:pl-8">
                          <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                          <p className="text-gray-600 mb-4">
                            Écran Super Retina XDR 6,3 pouces, puce A18 Pro, système photo pro
                          </p>
                          <div className="flex items-center mb-4">
                            <span className="text-2xl font-bold">{calculateTotal} €</span>
                            <span className="ml-2 text-sm text-gray-500">
                              ou {calculateMonthlyPrice} €/mois pendant 12 mois*
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sélection de la couleur */}
                    <div className="mb-8">
                      <h2 className="text-lg font-semibold mb-4">Choisissez une couleur</h2>
                      <div className="flex flex-wrap gap-4">
                        {colorOptions.map((color) => (
                          <button
                            key={color.id}
                            onClick={() => handleColorChange(color.name)}
                            className={`w-12 h-12 rounded-full border-2 transition-all ${
                              product.selectedColor === color.name ? "border-blue-500 scale-110" : "border-gray-300"
                            }`}
                            style={{
                              backgroundColor:
                                color.name === "Titane naturel"
                                  ? "#9E9E9A"
                                  : color.name === "Titane bleu"
                                    ? "#394E64"
                                    : color.name === "Titane blanc"
                                      ? "#F5F5F0"
                                      : color.name === "Titane graphite"
                                        ? "#2C3E50"
                                        : "#CCCCCC",
                            }}
                            aria-label={`Couleur ${color.name}`}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-sm text-gray-500">Sélectionné: {product.selectedColor}</p>
                    </div>

                    {/* Sélection du stockage */}
                    <div className="mb-8">
                      <h2 className="text-lg font-semibold mb-4">Choisissez une capacité de stockage</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {storageOptions.map((storage) => (
                          <button
                            key={storage.id}
                            onClick={() => handleStorageChange(storage)}
                            className={`p-4 rounded-lg border transition-all ${
                              product.selectedStorage.id === storage.id
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{storage.name}</span>
                              <span>
                                {storage.priceModifier > 0
                                  ? `+${storage.priceModifier} €`
                                  : storage.priceModifier < 0
                                    ? `${storage.priceModifier} €`
                                    : "Inclus"}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* AppleCare+ */}
                    <div className="mb-8">
                      <h2 className="text-lg font-semibold mb-4">Ajoutez AppleCare+ pour votre iPhone</h2>
                      <div className="space-y-4">
                        {appleCareOptions.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => handleOptionChange("applecare", option)}
                            className={`w-full p-4 rounded-lg border transition-all text-left ${
                              product.selectedOptions.applecare.id === option.id
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="font-medium">{option.name}</span>
                                {option.id !== "none" && (
                                  <p className="text-sm text-gray-500 mt-1">
                                    Service et assistance Apple. Couverture matérielle.
                                  </p>
                                )}
                              </div>
                              <span>{option.price > 0 ? `+${option.price} €` : "Inclus"}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Étape 2: Informations de livraison */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h1 className="text-2xl font-bold mb-6">Informations de livraison</h1>

                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                      <h2 className="text-lg font-semibold mb-4">Adresse de livraison</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">Prénom</Label>
                          <Input
                            id="firstName"
                            value={shippingInfo.firstName}
                            onChange={(e) => updateShippingInfo("firstName", e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Nom</Label>
                          <Input
                            id="lastName"
                            value={shippingInfo.lastName}
                            onChange={(e) => updateShippingInfo("lastName", e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={shippingInfo.email}
                            onChange={(e) => updateShippingInfo("email", e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={shippingInfo.phone}
                            onChange={(e) => updateShippingInfo("phone", e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="address">Adresse</Label>
                          <Input
                            id="address"
                            value={shippingInfo.address}
                            onChange={(e) => updateShippingInfo("address", e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="city">Ville</Label>
                          <Input
                            id="city"
                            value={shippingInfo.city}
                            onChange={(e) => updateShippingInfo("city", e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="postalCode">Code postal</Label>
                          <Input
                            id="postalCode"
                            value={shippingInfo.postalCode}
                            onChange={(e) => updateShippingInfo("postalCode", e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="country">Pays</Label>
                          <select
                            id="country"
                            value={shippingInfo.country}
                            onChange={(e) => updateShippingInfo("country", e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            required
                          >
                            <option value="France">France</option>
                            <option value="Belgique">Belgique</option>
                            <option value="Suisse">Suisse</option>
                            <option value="Canada">Canada</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                      <h2 className="text-lg font-semibold mb-4">Mode de livraison</h2>

                      <RadioGroup defaultValue="standard">
                        <div className="flex items-center space-x-2 mb-4">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="flex items-center">
                            <Truck className="mr-2 h-5 w-5 text-gray-500" />
                            <div>
                              <p className="font-medium">Livraison standard</p>
                              <p className="text-sm text-gray-500">Livraison sous 3-5 jours ouvrés</p>
                            </div>
                            <span className="ml-auto font-medium">Gratuit</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="flex items-center">
                            <Truck className="mr-2 h-5 w-5 text-gray-500" />
                            <div>
                              <p className="font-medium">Livraison express</p>
                              <p className="text-sm text-gray-500">Livraison sous 1-2 jours ouvrés</p>
                            </div>
                            <span className="ml-auto font-medium">+15 €</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </motion.div>
                )}

                {/* Étape 3: Paiement */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h1 className="text-2xl font-bold mb-6">Paiement</h1>

                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                      <h2 className="text-lg font-semibold mb-4">Informations de paiement</h2>

                      <div className="mb-6">
                        <RadioGroup defaultValue="card">
                          <div className="flex items-center space-x-2 mb-4">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex items-center">
                              <CreditCard className="mr-2 h-5 w-5 text-gray-500" />
                              <span className="font-medium">Carte bancaire</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Numéro de carte</Label>
                          <Input
                            id="cardNumber"
                            value={paymentInfo.cardNumber}
                            onChange={(e) => updatePaymentInfo("cardNumber", formatCardNumber(e.target.value))}
                            className="mt-1"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardName">Nom sur la carte</Label>
                          <Input
                            id="cardName"
                            value={paymentInfo.cardName}
                            onChange={(e) => updatePaymentInfo("cardName", e.target.value)}
                            className="mt-1"
                            placeholder="JEAN DUPONT"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Date d'expiration</Label>
                            <Input
                              id="expiryDate"
                              value={paymentInfo.expiryDate}
                              onChange={(e) => updatePaymentInfo("expiryDate", formatExpiryDate(e.target.value))}
                              className="mt-1"
                              placeholder="MM/AA"
                              maxLength={5}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">Code de sécurité</Label>
                            <Input
                              id="cvv"
                              value={paymentInfo.cvv}
                              onChange={(e) => updatePaymentInfo("cvv", e.target.value.replace(/\D/g, ""))}
                              className="mt-1"
                              placeholder="123"
                              maxLength={3}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                      <div className="flex items-center mb-4">
                        <ShieldCheck className="h-5 w-5 text-green-600 mr-2" />
                        <h2 className="text-lg font-semibold">Paiement sécurisé</h2>
                      </div>
                      <p className="text-sm text-gray-600">
                        Vos informations de paiement sont sécurisées. Nous utilisons le cryptage SSL pour protéger vos
                        données.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Boutons de navigation */}
                <div className="flex justify-between mt-8">
                  {step > 1 && (
                    <Button variant="outline" onClick={handlePreviousStep} disabled={isProcessing}>
                      Retour
                    </Button>
                  )}
                  <div className="ml-auto">
                    <Button onClick={handleNextStep} disabled={isProcessing} className="min-w-[120px]">
                      {isProcessing ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                          Traitement...
                        </div>
                      ) : step === 3 ? (
                        "Payer"
                      ) : (
                        "Continuer"
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Récapitulatif de commande */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg sticky top-20">
                  <h2 className="text-lg font-semibold mb-4">Récapitulatif</h2>

                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 relative mr-4">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">
                        {product.selectedColor}, {product.selectedStorage.name}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Prix de base</span>
                      <span>{product.basePrice} €</span>
                    </div>

                    {product.selectedStorage.priceModifier !== 0 && (
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Stockage ({product.selectedStorage.name})</span>
                        <span>
                          {product.selectedStorage.priceModifier > 0
                            ? `+${product.selectedStorage.priceModifier}`
                            : product.selectedStorage.priceModifier}{" "}
                          €
                        </span>
                      </div>
                    )}

                    {product.selectedOptions.applecare.price > 0 && (
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">{product.selectedOptions.applecare.name}</span>
                        <span>+{product.selectedOptions.applecare.price} €</span>
                      </div>
                    )}

                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Livraison</span>
                      <span>Gratuite</span>
                    </div>

                    <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t border-gray-200">
                      <span>Total</span>
                      <span>{calculateTotal} €</span>
                    </div>
                  </div>

                  <div className="mt-6 text-sm text-gray-500">
                    <p className="mb-2">
                      <span className="font-medium text-black">Livraison estimée:</span> 3-5 jours ouvrés
                    </p>
                    <p>* Financement soumis à conditions. Voir détails.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

