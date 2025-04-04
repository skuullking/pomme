import bcrypt from "bcryptjs"
import { query } from "./db.js"

// Créer un nouvel utilisateur
export async function createUser({ email, password, firstName, lastName }) {
  try {
    // Vérifier si l'utilisateur existe déjà
    const checkUser = await query("SELECT * FROM users WHERE email = $1", [email])

    if (checkUser.rows.length > 0) {
      return { success: false, error: "Un utilisateur avec cet email existe déjà" }
    }

    // Hacher le mot de passe
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Insérer l'utilisateur dans la base de données
    const result = await query(
      "INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name",
      [email, hashedPassword, firstName, lastName],
    )

    return { success: true, user: result.rows[0] }
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error)
    return { success: false, error: "Erreur lors de la création de l'utilisateur" }
  }
}

// Récupérer un utilisateur par son email
export async function getUserByEmail(email) {
  try {
    const result = await query("SELECT * FROM users WHERE email = $1", [email])

    return result.rows[0] || null
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error)
    return null
  }
}

// Vérifier les informations de connexion d'un utilisateur
export async function verifyUser(email, password) {
  try {
    // Récupérer l'utilisateur
    const user = await getUserByEmail(email)

    // Si l'utilisateur n'existe pas
    if (!user) {
      return { success: false, error: "Utilisateur non trouvé" }
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return { success: false, error: "Mot de passe incorrect" }
    }

    // Ne pas renvoyer le mot de passe
    const { password: _, ...userWithoutPassword } = user

    return { success: true, user: userWithoutPassword }
  } catch (error) {
    console.error("Erreur lors de la vérification de l'utilisateur:", error)
    return { success: false, error: "Erreur lors de la vérification de l'utilisateur" }
  }
}

export default {
  createUser,
  getUserByEmail,
  verifyUser,
}

