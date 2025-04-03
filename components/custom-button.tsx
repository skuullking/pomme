"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "dark" | "light"
  size?: "sm" | "md" | "lg"
  icon?: React.ReactNode
  isLoading?: boolean
  fullWidth?: boolean
}

export function CustomButton({
  children,
  className,
  variant = "primary",
  size = "md",
  icon,
  isLoading = false,
  fullWidth = false,
  ...props
}: CustomButtonProps) {
  // Définir les classes de base en fonction de la variante
  const baseClasses = {
    primary: "btn-apple",
    outline: "btn-apple-outline",
    dark: "btn-dark",
    light: "btn-light",
  }

  // Définir les classes de taille
  const sizeClasses = {
    sm: "text-xs px-4 py-1.5",
    md: "text-sm px-6 py-2",
    lg: "text-base px-8 py-3",
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        baseClasses[variant],
        sizeClasses[size],
        "font-medium flex items-center justify-center",
        fullWidth ? "w-full" : "",
        className,
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
          <span>Chargement...</span>
        </div>
      ) : (
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </div>
      )}
    </motion.button>
  )
}

