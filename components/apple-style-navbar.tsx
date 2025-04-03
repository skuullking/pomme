"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ShoppingBag, X, Menu } from "lucide-react"

export default function AppleStyleNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Détecter le défilement pour changer l'apparence de la navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Empêcher le défilement du body quand le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    if (searchOpen) setSearchOpen(false)
  }

  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
    if (isOpen) setIsOpen(false)
  }

  // Variantes d'animation pour le menu
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "calc(100vh - 44px)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  const menuItems = [
    { name: "iPhone", href: "/compare" },
    { name: "Comparer", href: "/compare" },
    { name: "Prix", href: "/price-tracker" },
    { name: "Acheter", href: "/checkout" },
    { name: "Support", href: "#" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Barre de navigation principale */}
      <nav
        className={`h-12 flex items-center justify-between px-4 md:px-8 transition-all duration-300 ${
          scrolled || isOpen || searchOpen ? "bg-black text-white" : "bg-black/90 backdrop-blur-md text-white"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
            <path d="M10 2c1 .5 2 2 2 5" />
          </svg>
        </Link>

        {/* Navigation desktop */}
        <div className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white/80 hover:text-white text-xs font-medium transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Icônes à droite */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSearch}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Rechercher"
          >
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </button>

          <Link href="/checkout" className="text-white/80 hover:text-white transition-colors" aria-label="Panier">
            <ShoppingBag size={18} />
          </Link>

          <button
            onClick={toggleMenu}
            className="md:hidden text-white/80 hover:text-white transition-colors"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Barre de recherche */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-black/90 backdrop-blur-md py-3 px-4"
          >
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Rechercher un iPhone"
                className="w-full bg-gray-800/70 text-white rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden w-full bg-black/90 backdrop-blur-md overflow-y-auto"
          >
            <div className="px-4 py-6">
              <ul className="space-y-4">
                {menuItems.map((item, i) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0.1 + i * 0.1,
                        duration: 0.4,
                      },
                    }}
                    className="border-b border-gray-800 pb-4"
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-between text-white text-lg font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{item.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

