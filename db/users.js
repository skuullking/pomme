import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Vérifier si l'utilisateur existe
    const { rows: users } = await sql`
      SELECT * FROM users 
      WHERE email = ${email} 
      LIMIT 1
    `;

    if (users.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const user = users[0];

    // Ajouter des logs pour déboguer
    console.log("Mot de passe fourni :", password);
    console.log("Mot de passe haché dans la base de données :", user.password);

    // Vérifier si le mot de passe est correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Retourner les informations de l'utilisateur (sans le mot de passe)
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({
      message: "Login successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}