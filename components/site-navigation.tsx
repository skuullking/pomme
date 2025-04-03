"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ShoppingBag, X, Menu, User, ChevronDown, LogOut, UserCircle } from "lucide-react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

export default function SiteNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const [iPhoneMenuOpen, setIPhoneMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, isGuest, logout } = useAuth()

  const iPhoneMenuRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Fermer les menus quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (iPhoneMenuRef.current && !iPhoneMenuRef.current.contains(event.target as Node)) {
        setIPhoneMenuOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Détecter le défilement pour changer l'apparence de la navbar et la cacher/afficher
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY

      // Déterminer si on doit afficher ou cacher la navbar
      if (currentScrollPos > 100) {
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)
      } else {
        setVisible(true)
      }

      // Mettre à jour l'état scrolled
      setScrolled(currentScrollPos > 10)

      // Sauvegarder la position de défilement
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollPos])

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
    if (iPhoneMenuOpen) setIPhoneMenuOpen(false)
    if (userMenuOpen) setUserMenuOpen(false)
  }

  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
    if (isOpen) setIsOpen(false)
    if (iPhoneMenuOpen) setIPhoneMenuOpen(false)
    if (userMenuOpen) setUserMenuOpen(false)
  }

  const toggleIPhoneMenu = () => {
    setIPhoneMenuOpen(!iPhoneMenuOpen)
    if (userMenuOpen) setUserMenuOpen(false)
  }

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen)
    if (iPhoneMenuOpen) setIPhoneMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
    window.location.href = "/"
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

  // Variantes d'animation pour la barre de recherche
  const searchVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.1,
        ease: "easeInOut",
      },
    },
  }

  // Variantes d'animation pour les sous-menus
  const submenuVariants = {
    closed: {
      opacity: 0,
      y: -10,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  // Variantes d'animation pour les éléments du menu
  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  }

  // Modèles d'iPhone 16 pour le sous-menu
  const iphone16Models = [
    { name: "iPhone 16", href: "/models/iphone-16" },
    { name: "iPhone 16 Plus", href: "/models/iphone-16-plus" },
    { name: "iPhone 16 Pro", href: "/models/iphone-16-pro" },
    { name: "iPhone 16 Pro Max", href: "/models/iphone-16-pro-max" },
    { name: "iPhone 16E", href: "/models/iphone-16e" },
  ]

  // Définir les éléments de menu avec une condition pour les afficher ou non
  const menuItems = [
    {
      name: "Accueil",
      href: "/",
      show: pathname !== "/", // Ne pas afficher "Accueil" si on est déjà sur la page d'accueil
    },
    {
      name: "iPhone",
      href: "/compare",
      hasSubmenu: true,
      action: toggleIPhoneMenu,
      show: true, // Toujours afficher le menu iPhone
    },
    {
      name: "Comparer",
      href: "/compare",
      show: pathname !== "/compare", // Ne pas afficher "Comparer" si on est déjà sur la page de comparaison
    },
    {
      name: "Prix",
      href: "/price-tracker",
      show: pathname !== "/price-tracker", // Ne pas afficher "Prix" si on est déjà sur la page de prix
    },
    {
      name: "Acheter",
      href: "/checkout",
      show: pathname !== "/checkout", // Ne pas afficher "Acheter" si on est déjà sur la page d'achat
    },
  ]

  // Filtrer les éléments de menu à afficher
  const visibleMenuItems = menuItems.filter((item) => item.show)

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: 0 }}
      animate={{
        y: visible ? 0 : -100,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Barre de navigation principale */}
      <nav
        className={`h-11 md:h-12 flex items-center justify-between px-4 md:px-8 transition-all duration-300 ${
          scrolled || isOpen || searchOpen || iPhoneMenuOpen || userMenuOpen
            ? "bg-black/90 backdrop-blur-md"
            : "bg-black/80 backdrop-blur-sm"
        }`}
      >
        {/* Logo Apple */}
        <Link href="/" className="text-white">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
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
          </motion.div>
        </Link>

        {/* Navigation desktop */}
        <div className="hidden md:flex space-x-8 items-center">
          {visibleMenuItems.map((item, index) => (
            <div key={item.name} className="relative flex items-center h-full">
              {item.hasSubmenu ? (
                <button
                  onClick={item.action}
                  className={`text-white/80 hover:text-white text-xs font-medium transition-colors flex items-center ${
                    pathname === item.href || iPhoneMenuOpen ? "text-white" : ""
                  }`}
                >
                  <motion.span
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ y: -2 }}
                  >
                    {item.name}
                  </motion.span>
                  <ChevronDown
                    size={12}
                    className={`ml-1 transition-transform ${iPhoneMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`text-white/80 hover:text-white text-xs font-medium transition-colors ${
                    pathname === item.href ? "text-white" : ""
                  }`}
                >
                  <motion.span
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ y: -2 }}
                  >
                    {item.name}
                  </motion.span>
                </Link>
              )}

              {/* Sous-menu iPhone */}
              {item.name === "iPhone" && (
                <AnimatePresence>
                  {iPhoneMenuOpen && (
                    <motion.div
                      ref={iPhoneMenuRef}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={submenuVariants}
                      className="absolute top-full left-0 mt-1 bg-black/90 backdrop-blur-md rounded-lg overflow-hidden w-48 shadow-lg"
                    >
                      <div className="py-2">
                        {iphone16Models.map((model, idx) => (
                          <motion.div
                            key={model.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05, duration: 0.2 }}
                          >
                            <Link
                              href={model.href}
                              className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-gray-800"
                              onClick={() => setIPhoneMenuOpen(false)}
                            >
                              {model.name}
                            </Link>
                          </motion.div>
                        ))}
                        <div className="border-t border-gray-800 my-1"></div>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3, duration: 0.2 }}
                        >
                          <Link
                            href="/compare"
                            className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-gray-800"
                            onClick={() => setIPhoneMenuOpen(false)}
                          >
                            Comparer tous les modèles
                          </Link>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* Icônes à droite */}
        <div className="flex items-center space-x-4 h-full">
          <button
            className="text-white/80 hover:text-white transition-colors h-full flex items-center"
            aria-label="Rechercher"
            onClick={toggleSearch}
          >
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </button>

          {/* N'afficher le panier que si on n'est pas déjà sur la page checkout */}
          {pathname !== "/checkout" && (
            <Link
              href="/checkout"
              className="text-white/80 hover:text-white transition-colors h-full flex items-center"
              aria-label="Panier"
            >
              <ShoppingBag size={18} />
            </Link>
          )}

          {/* Menu utilisateur - maintenant aligné avec les autres éléments */}
          <div className="relative h-full flex items-center">
            <button
              onClick={toggleUserMenu}
              className="text-white/80 hover:text-white transition-colors h-full flex items-center"
              aria-label="Compte utilisateur"
            >
              <User size={18} />
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  ref={userMenuRef}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={submenuVariants}
                  className="absolute top-full right-0 mt-1 bg-black/90 backdrop-blur-md rounded-lg overflow-hidden w-48 shadow-lg"
                >
                  <div className="py-2">
                    {isAuthenticated ? (
                      <>
                        {/* Ne pas afficher "Mon compte" si on est déjà sur la page account */}
                        {pathname !== "/account" && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05, duration: 0.2 }}
                          >
                            <Link
                              href="/account"
                              className="flex items-center px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-gray-800"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <UserCircle size={16} className="mr-2" />
                              Mon compte
                            </Link>
                          </motion.div>
                        )}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1, duration: 0.2 }}
                        >
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-gray-800"
                          >
                            <LogOut size={16} className="mr-2" />
                            Se déconnecter
                          </button>
                        </motion.div>
                      </>
                    ) : (
                      <>
                        {/* Ne pas afficher "Se connecter" si on est déjà sur la page account-access */}
                        {pathname !== "/account-access" && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05, duration: 0.2 }}
                          >
                            <Link
                              href="/account-access"
                              className="flex items-center px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-gray-800"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <UserCircle size={16} className="mr-2" />
                              Se connecter
                            </Link>
                          </motion.div>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            className="md:hidden text-white/80 hover:text-white transition-colors h-full flex items-center"
            onClick={toggleMenu}
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
            initial="closed"
            animate="open"
            exit="closed"
            variants={searchVariants}
            className="w-full bg-black/90 backdrop-blur-md py-3 px-4"
          >
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <motion.form
                action="/search"
                method="GET"
                initial={{ width: "80%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <input
                  type="text"
                  name="q"
                  placeholder="Rechercher un iPhone, modèle, fonctionnalité..."
                  className="w-full bg-gray-800/70 text-white rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  autoFocus
                />
              </motion.form>
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
                {/* Filtrer les éléments de menu pour le mobile également */}
                {menuItems
                  .filter(
                    (item) =>
                      // Pour le mobile, on affiche toujours "Accueil" pour faciliter la navigation
                      item.name === "Accueil" || item.show,
                  )
                  .map((item, i) => (
                    <motion.li
                      key={item.name}
                      custom={i}
                      variants={itemVariants}
                      className="border-b border-gray-800 pb-4"
                    >
                      {item.hasSubmenu ? (
                        <div>
                          <button
                            onClick={() => {
                              const submenu = document.getElementById(`submenu-${item.name}`)
                              if (submenu) {
                                submenu.classList.toggle("hidden")
                              }
                            }}
                            className="flex items-center justify-between w-full text-white text-lg font-medium"
                          >
                            <span>{item.name}</span>
                            <ChevronDown size={16} />
                          </button>
                          <div id={`submenu-${item.name}`} className="hidden mt-2 ml-4 space-y-2">
                            {iphone16Models.map((model, idx) => (
                              <Link
                                key={model.name}
                                href={model.href}
                                className="block py-2 text-white/80 hover:text-white text-base"
                                onClick={() => setIsOpen(false)}
                              >
                                {model.name}
                              </Link>
                            ))}
                            <Link
                              href="/compare"
                              className="block py-2 text-white/80 hover:text-white text-base"
                              onClick={() => setIsOpen(false)}
                            >
                              Comparer tous les modèles
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="flex items-center justify-between text-white text-lg font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          <span>{item.name}</span>
                          <motion.span
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                          >
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
                              className="h-4 w-4"
                            >
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </motion.span>
                        </Link>
                      )}
                    </motion.li>
                  ))}

                {/* Ajouter le lien Compte uniquement s'il n'est pas déjà sur la page correspondante */}
                {(isAuthenticated && pathname !== "/account") ||
                (!isAuthenticated && pathname !== "/account-access") ? (
                  <motion.li
                    custom={menuItems.length}
                    variants={itemVariants}
                    className="border-b border-gray-800 pb-4"
                  >
                    <Link
                      href={isAuthenticated ? "/account" : "/account-access"}
                      className="flex items-center justify-between text-white text-lg font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>Compte</span>
                      <motion.span
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + menuItems.length * 0.1 }}
                      >
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
                          className="h-4 w-4"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </motion.span>
                    </Link>
                  </motion.li>
                ) : null}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

