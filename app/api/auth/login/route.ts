import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { query } from "@/lib/db"

export async function POST(request: Request) {
  try {
    // Récupérer les données du corps de la requête
    const body = await request.json()
    const { email, password } = body

    console.log("Tentative de connexion:", { email })

    // Valider les données
    if (!email || !password) {
      console.log("Validation échouée: email ou mot de passe manquant")
      return NextResponse.json({ success: false, error: "Email et mot de passe requis" }, { status: 400 })
    }

    try {
      // Vérifier si la table users existe
      try {
        await query("SELECT 1 FROM users LIMIT 1")
      } catch (tableError) {
        console.log("La table users n'existe pas ou n'est pas accessible")

        // Mode fallback pour la démo
        if (email === "demo@example.com" && password === "password123") {
          console.log("Connexion en mode fallback réussie pour:", email)
          return NextResponse.json({
            success: true,
            user: {
              id: "demo-fallback",
              email: "demo@example.com",
              firstName: "Demo",
              lastName: "User",
            },
          })
        }

        return NextResponse.json({ success: false, error: "Utilisateur non trouvé" }, { status: 401 })
      }

      // Récupérer l'utilisateur
      const result = await query("SELECT * FROM users WHERE email = $1", [email])

      if (result.rows.length === 0) {
        console.log("Utilisateur non trouvé:", email)

        // Mode fallback pour la démo
        if (email === "demo@example.com" && password === "password123") {
          console.log("Connexion en mode fallback réussie pour:", email)
          return NextResponse.json({
            success: true,
            user: {
              id: "demo-fallback",
              email: "demo@example.com",
              firstName: "Demo",
              lastName: "User",
            },
          })
        }

        return NextResponse.json({ success: false, error: "Utilisateur non trouvé" }, { status: 401 })
      }

      const user = result.rows[0]

      // Vérifier le mot de passe
      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        console.log("Mot de passe incorrect pour:", email)
        return NextResponse.json({ success: false, error: "Mot de passe incorrect" }, { status: 401 })
      }

      console.log("Connexion réussie pour:", email)

      // Retourner l'utilisateur connecté (sans le mot de passe)
      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
        },
      })
    } catch (dbError) {
      console.error("Erreur de base de données lors de la connexion:", dbError)

      // Mode fallback pour la démo
      if (email === "demo@example.com" && password === "password123") {
        console.log("Connexion en mode fallback réussie pour:", email)
        return NextResponse.json({
          success: true,
          user: {
            id: "demo-fallback",
            email: "demo@example.com",
            firstName: "Demo",
            lastName: "User",
          },
        })
      }

      return NextResponse.json(
        {
          success: false,
          error: "Erreur de base de données lors de la connexion",
          details: dbError instanceof Error ? dbError.message : "Erreur inconnue",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Erreur lors du traitement de la requête de connexion:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors du traitement de la requête",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 },
    )
  }
}

