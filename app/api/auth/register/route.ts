import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { query } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, firstName, lastName } = body
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ success: false, error: "Tous les champs sont requis" }, { status: 400 })
    }
    try {
      await query("SELECT 1 FROM users LIMIT 1")
    } catch (tableError) {
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
    }
    const checkUser = await query("SELECT * FROM users WHERE email = $1", [email])
    if (checkUser.rows.length > 0) {
      return NextResponse.json({ success: false, error: "Un utilisateur avec cet email existe déjà" }, { status: 400 })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const result = await query(
      "INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name",
      [email, hashedPassword, firstName, lastName],
    )
    return NextResponse.json({
      success: true,
      user: {
        id: result.rows[0].id,
        email: result.rows[0].email,
        firstName: result.rows[0].first_name,
        lastName: result.rows[0].last_name,
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erreur lors de l'inscription" }, { status: 500 })
  }
}
