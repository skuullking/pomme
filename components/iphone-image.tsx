"use client"

import { useState } from "react"
import Image from "next/image"
import { getIPhoneImagePath, getPlaceholderImage } from "@/lib/image-utils"

interface IPhoneImageProps {
  name: string
  color: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  alt?: string
}

export default function IPhoneImage({
  name,
  color,
  width = 400,
  height = 800,
  priority = false,
  className = "",
  alt = "",
}: IPhoneImageProps) {
  const [imgSrc, setImgSrc] = useState(getIPhoneImagePath(name, color))
  const [hasError, setHasError] = useState(false)

  // Gérer les erreurs de chargement d'image
  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc(getPlaceholderImage(name))
    }
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Image
        src={imgSrc || "/placeholder.svg"}
        alt={alt || `${name} en ${color}`}
        fill
        priority={priority}
        className="object-contain"
        onError={handleError}
      />
    </div>
  )
}

