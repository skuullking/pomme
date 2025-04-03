import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Vérifier si la base de données est disponible
    if (!process.env.POSTGRES_URL && !process.env.DATABASE_URL) {
      // Si pas de base de données, simuler une connexion réussie pour la démo
      if (email === "demo@example.com" && password === "password") {
        return NextResponse.json({
          id: "demo-user",
          email: "demo@example.com",
          first_name: "Utilisateur",
          last_name: "Démo",
        })
      } else {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }
    }

    // Si la base de données est disponible, procéder normalement
    const { rows } = await sql`
      SELECT * FROM users 
      WHERE email = ${email} 
      LIMIT 1
    `

    if (rows.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const user = rows[0]

    // Dans une application réelle, vous utiliseriez bcrypt.compare
    // Pour la démo, nous faisons une vérification simple
    if (user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Ne pas renvoyer le mot de passe au client
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "An error occurred during login" }, { status: 500 })
  }
}

