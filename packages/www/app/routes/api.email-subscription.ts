// app/routes/api.email-subscription.ts
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

interface DatabaseResult {
  id: number;
  email: string;
  created_at: Date;
}

async function saveEmailToDatabase(email: string): Promise<DatabaseResult> {
  const client = await pool.connect();
  try {
    const query = "INSERT INTO email_subscribers(email) VALUES($1) RETURNING *";
    const values = [email];
    const result = await client.query<DatabaseResult>(query, values);
    return result.rows[0];
  } finally {
    client.release();
  }
}

async function deleteEmailFromDatabase(email: string): Promise<DatabaseResult> {
  const client = await pool.connect();
  try {
    const query = "DELETE FROM email_subscribers WHERE email = $1 RETURNING *";
    const values = [email];
    const result = await client.query<DatabaseResult>(query, values);
    if (result.rows.length === 0) {
      throw new Error("Email not found");
    }
    return result.rows[0];
  } finally {
    client.release();
  }
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const action = formData.get("action");

  if (!email || typeof email !== "string") {
    return json({ error: "Email is required" }, { status: 400 });
  }

  try {
    if (action === "subscribe") {
      await saveEmailToDatabase(email);
      return json({ message: "Subscribed successfully" });
    } else if (action === "unsubscribe") {
      await deleteEmailFromDatabase(email);
      return json({ message: "Unsubscribed successfully" });
    } else {
      return json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Database operation failed:", error);
    return json(
      { error: "An error occurred. Please try again." },
      { status: 500 },
    );
  }
};
