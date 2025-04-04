import { NextResponse } from "next/server"
import { verifyUser } from "@/lib/users.js"

export async function POST(request) {
  try {
    // Récupérer les données du corps de la requête
    const { email, password } = await request.json()

    // Valider les données
    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email et mot de passe requis" }, { status: 400 })
    }

    // Vérifier les informations de connexion
    const result = await verifyUser(email, password)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 401 })
    }

    // Retourner l'utilisateur connecté
    return NextResponse.json({
      success: true,
      user: result.user,
    })
  } catch (error) {
    console.error("Erreur lors de la connexion:", error)
    return NextResponse.json({ success: false, error: "Erreur lors de la connexion" }, { status: 500 })
  }
}

