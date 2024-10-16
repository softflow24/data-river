import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
);

interface DatabaseResult {
  id: number;
  email: string;
  created_at: Date;
}

async function saveEmailToDatabase(email: string): Promise<DatabaseResult> {
  const { data, error } = await supabase
    .from("email_subscribers")
    .insert({ email })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("Email already exists");
    }
    throw error;
  }

  return data;
}

async function deleteEmailFromDatabase(email: string): Promise<DatabaseResult> {
  const { data, error } = await supabase
    .from("email_subscribers")
    .delete()
    .eq("email", email)
    .select()
    .single();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("Email not found");
  }

  return data;
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
