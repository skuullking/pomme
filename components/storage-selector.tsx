"use client"
import { motion } from "framer-motion"

interface StorageSelectorProps {
  options: string
  selectedStorage: string
  onChange: (storage: string) => void
}

export default function StorageSelector({ options, selectedStorage, onChange }: StorageSelectorProps) {
  // Séparer les options par des virgules et les nettoyer
  const storageOptions = options.split(",").map((option) => option.trim())

  return (
    <div className="flex flex-wrap justify-center gap-2 my-4">
      {storageOptions.map((option, index) => (
        <motion.button
          key={index}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedStorage === option ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => onChange(option)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {option}
        </motion.button>
      ))}
    </div>
  )
}

