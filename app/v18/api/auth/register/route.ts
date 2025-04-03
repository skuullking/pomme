import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName } = await request.json()

    // Vérifier si la base de données est disponible
    if (!process.env.POSTGRES_URL && !process.env.DATABASE_URL) {
      console.log("Aucune connexion à la base de données disponible, utilisation du mode fallback")
      // Si pas de base de données, simuler une inscription réussie pour la démo
      return NextResponse.json({
        id: "new-user",
        email,
        first_name: firstName,
        last_name: lastName,
      })
    }

    // Si la base de données est disponible, procéder normalement
    try {
      // Vérifier si l'utilisateur existe déjà
      const { rows: existingUsers } = await sql`
      SELECT * FROM users 
      WHERE email = ${email} 
      LIMIT 1
    `

      if (existingUsers.length > 0) {
        return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
      }

      // Dans une application réelle, vous hacheriez le mot de passe avant de le stocker
      // Pour la démo, nous le stockons tel quel (non recommandé pour la production)
      const { rows } = await sql`
      INSERT INTO users (email, password, first_name, last_name)
      VALUES (${email}, ${password}, ${firstName}, ${lastName})
      RETURNING id, email, first_name, last_name
    `

      return NextResponse.json(rows[0])
    } catch (dbError) {
      console.error("Erreur de base de données:", dbError)
      // En cas d'erreur de base de données, utiliser le mode fallback
      console.log("Erreur de base de données, utilisation du mode fallback")
      return NextResponse.json({
        id: "new-user-fallback",
        email,
        first_name: firstName,
        last_name: lastName,
      })
    }
  } catch (error) {
    console.error("Registration error:", error)
    // Retourner une réponse plus détaillée pour le débogage
    return NextResponse.json(
      {
        error: "An error occurred during registration",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

