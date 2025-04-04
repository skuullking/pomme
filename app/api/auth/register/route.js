import { NextResponse } from "next/server"
import { createUser } from "@/lib/users.js"

export async function POST(request) {
  try {
    // Récupérer les données du corps de la requête
    const { email, password, firstName, lastName } = await request.json()

    // Valider les données
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ success: false, error: "Tous les champs sont requis" }, { status: 400 })
    }

    // Créer l'utilisateur
    const result = await createUser({ email, password, firstName, lastName })

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    // Retourner l'utilisateur créé
    return NextResponse.json({
      success: true,
      user: result.user,
    })
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error)
    return NextResponse.json({ success: false, error: "Erreur lors de l'inscription" }, { status: 500 })
  }
}

