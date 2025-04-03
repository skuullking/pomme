// This is a script to set up your database
// You would run this once to create your tables and insert data

import { createPool } from "@vercel/postgres"
import fs from "fs"

async function setupDatabase() {
  const pool = createPool()

  try {
    console.log("Setting up database...")

    // Read the schema SQL file
    const schemaSql = fs.readFileSync("./db/schema.sql", "utf8")

    // Split the SQL into individual statements
    const statements = schemaSql.split(";").filter((stmt) => stmt.trim())

    // Execute each statement
    for (const statement of statements) {
      if (statement.trim()) {
        await pool.query(statement + ";")
        console.log("Executed SQL statement")
      }
    }

    console.log("Database setup complete!")

    // Verify the data was inserted
    const { rows } = await pool.query("SELECT COUNT(*) FROM iphones")
    console.log(`Inserted ${rows[0].count} iPhone records`)
  } catch (error) {
    console.error("Error setting up database:", error)
  } finally {
    await pool.end()
  }
}

setupDatabase()

