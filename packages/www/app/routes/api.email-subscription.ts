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
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    if (isUniqueViolationError(error)) {
      throw new Error("Email already exists");
    }
    throw error;
  } finally {
    client.release();
  }
}

async function deleteEmailFromDatabase(email: string): Promise<DatabaseResult> {
  const client = await pool.connect();
  try {
    const query = "DELETE FROM email_subscribers WHERE email = $1 RETURNING *";
    const values = [email];
    const result = await client.query(query, values);
    if (result.rows.length === 0) {
      throw new Error("Email not found");
    }
    return result.rows[0];
  } finally {
    client.release();
  }
}

function isUniqueViolationError(error: unknown): error is { code: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: string }).code === "23505"
  );
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
    if (error instanceof Error) {
      if (error.message === "Email already exists") {
        return json({ error: "Email is already subscribed" }, { status: 409 });
      } else if (error.message === "Email not found") {
        return json({ error: "Email not found" }, { status: 404 });
      }
    }
    return json(
      { error: "An error occurred. Please try again." },
      { status: 500 },
    );
  }
};
