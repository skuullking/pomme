"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  email: string
  firstName: string
  lastName: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isGuest: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
}

type RegisterData = {
  email: string
  password: string
  firstName: string
  lastName: string
}

// Simuler une base de données locale avec localStorage
const localUserDb = {
  getUsers: (): Record<string, User & { password: string }> => {
    try {
      const users = localStorage.getItem("local_users")
      return users ? JSON.parse(users) : {}
    } catch (error) {
      console.error("Error reading local users:", error)
      return {}
    }
  },

  saveUsers: (users: Record<string, User & { password: string }>) => {
    try {
      localStorage.setItem("local_users", JSON.stringify(users))
    } catch (error) {
      console.error("Error saving local users:", error)
    }
  },

  addUser: (userData: RegisterData): User => {
    const users = localUserDb.getUsers()
    const userId = `user_${Date.now()}`

    const newUser = {
      id: userId,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: userData.password,
    }

    users[userData.email] = newUser
    localUserDb.saveUsers(users)

    // Retourner l'utilisateur sans le mot de passe
    const { password, ...userWithoutPassword } = newUser
    return userWithoutPassword
  },

  findUserByEmail: (email: string): (User & { password: string }) | null => {
    const users = localUserDb.getUsers()
    return users[email] || null
  },
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isGuest, setIsGuest] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        setIsLoading(true)
        const storedUser = localStorage.getItem("user")
        const isGuestUser = localStorage.getItem("guestUser") === "true"

        if (storedUser) {
          setUser(JSON.parse(storedUser))
          setIsGuest(isGuestUser) // Définir isGuest en fonction du flag
        } else if (isGuestUser) {
          // Définir l'état invité
          setIsGuest(true)
          // Créer un utilisateur invité fictif
          const guestUser = {
            id: "guest",
            email: "guest@example.com",
            firstName: "Utilisateur",
            lastName: "Invité",
          }

          // Stocker l'utilisateur invité dans localStorage
          localStorage.setItem("user", JSON.stringify(guestUser))

          setUser(guestUser)
        } else {
          setUser(null)
          setIsGuest(false)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        setUser(null)
        setIsGuest(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Fonction de connexion utilisant la base de données locale
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Ajouter un délai artificiel pour simuler une requête réseau
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Vérifier si l'utilisateur existe dans la base de données locale
      const user = localUserDb.findUserByEmail(email)

      // Si l'utilisateur existe et le mot de passe correspond
      if (user && user.password === password) {
        // Créer une copie de l'utilisateur sans le mot de passe
        const { password: _, ...userWithoutPassword } = user

        // Stocker l'utilisateur dans localStorage
        localStorage.setItem("user", JSON.stringify(userWithoutPassword))
        localStorage.removeItem("guestUser") // S'assurer que l'état invité est supprimé

        setUser(userWithoutPassword)
        setIsGuest(false)
        return true
      }

      // Fallback pour la démo
      if (email === "demo@example.com" && password === "password") {
        const userData = {
          id: "demo-user",
          email,
          firstName: "Utilisateur",
          lastName: "Démo",
        }

        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.removeItem("guestUser")

        setUser(userData)
        setIsGuest(false)
        return true
      }

      return false
    } catch (error) {
      console.error("Login failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction d'inscription utilisant la base de données locale
  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Ajouter un délai artificiel pour simuler une requête réseau
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Vérifier si l'utilisateur existe déjà
      const existingUser = localUserDb.findUserByEmail(userData.email)
      if (existingUser) {
        console.log("Un utilisateur avec cet email existe déjà")
        return false
      }

      // Ajouter l'utilisateur à la base de données locale
      const newUser = localUserDb.addUser(userData)
      console.log("Utilisateur enregistré avec succès:", newUser)

      return true
    } catch (error) {
      console.error("Registration failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("guestUser")
    setUser(null)
    setIsGuest(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isGuest,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

