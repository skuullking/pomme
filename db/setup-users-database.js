// Ajouter cette ligne au début du fichier pour charger les variables d'environnement
import "dotenv/config"

// This is a script to set up your users database
// You would run this once to create your tables

import { createPool } from "@vercel/postgres"
import fs from "fs"
import bcrypt from "bcryptjs"

async function setupUsersDatabase() {
  const pool = createPool()

  try {
    console.log("Setting up users database...")

    // Read the schema SQL file
    const schemaSql = fs.readFileSync("./db/users-schema.sql", "utf8")

    // Split the SQL into individual statements
    const statements = schemaSql.split(";").filter((stmt) => stmt.trim())

    // Execute each statement
    for (const statement of statements) {
      if (statement.trim()) {
        await pool.query(statement + ";")
        console.log("Executed SQL statement")
      }
    }

    // Create a demo user
    const hashedPassword = await bcrypt.hash("password123", 10)

    await pool.query(
      `
      INSERT INTO users (email, password, first_name, last_name)
      VALUES ('demo@example.com', $1, 'Demo', 'User')
      ON CONFLICT (email) DO NOTHING
    `,
      [hashedPassword],
    )

    console.log("Users database setup complete!")

    // Verify the data was inserted
    const { rows } = await pool.query("SELECT COUNT(*) FROM users")
    console.log(`Database contains ${rows[0].count} users`)
  } catch (error) {
    console.error("Error setting up users database:", error)
  } finally {
    await pool.end()
  }
}

setupUsersDatabase()

