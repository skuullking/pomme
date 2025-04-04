import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { query } from "@/lib/db"

export async function POST(request: Request) {
  try {
    // Récupérer les données du corps de la requête
    const body = await request.json()
    const { email, password, firstName, lastName } = body

    console.log("Tentative d'inscription:", { email, firstName, lastName })

    // Valider les données
    if (!email || !password || !firstName || !lastName) {
      console.log("Validation échouée: champs manquants")
      return NextResponse.json({ success: false, error: "Tous les champs sont requis" }, { status: 400 })
    }

    try {
      // Vérifier si la table users existe
      try {
        await query("SELECT 1 FROM users LIMIT 1")
        console.log("Table users vérifiée avec succès")
      } catch (tableError) {
        console.log("Création de la table users...")

        // Créer la table users si elle n'existe pas
        await query(`
          CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          )
        `)
        console.log("Table users créée avec succès")
      }

      // Vérifier si l'utilisateur existe déjà
      const checkUser = await query("SELECT * FROM users WHERE email = $1", [email])

      if (checkUser.rows.length > 0) {
        console.log("Utilisateur existant:", email)
        return NextResponse.json(
          { success: false, error: "Un utilisateur avec cet email existe déjà" },
          { status: 400 },
        )
      }

      // Hacher le mot de passe
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      // Insérer l'utilisateur dans la base de données
      const result = await query(
        "INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name",
        [email, hashedPassword, firstName, lastName],
      )

      console.log("Utilisateur créé avec succès:", result.rows[0])

      // Retourner l'utilisateur créé
      return NextResponse.json({
        success: true,
        user: {
          id: result.rows[0].id,
          email: result.rows[0].email,
          firstName: result.rows[0].first_name,
          lastName: result.rows[0].last_name,
        },
      })
    } catch (dbError) {
      console.error("Erreur de base de données lors de l'inscription:", dbError)
      return NextResponse.json(
        {
          success: false,
          error: "Erreur de base de données lors de l'inscription",
          details: dbError instanceof Error ? dbError.message : "Erreur inconnue",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Erreur lors du traitement de la requête d'inscription:", error)
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

