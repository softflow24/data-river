import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
);

async function saveEmailToDatabase(
  email: string,
  request: Request,
): Promise<void> {
  const ip_address =
    request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip");
  const user_agent = request.headers.get("user-agent");

  const { error } = await supabase.from("email_subscribers").insert({
    email,
    status: "active",
    source: "website",
    ip_address,
    user_agent,
  });

  if (error) {
    if (error.code === "23505") {
      throw new Error("Email already exists");
    }
    throw error;
  }
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");

  if (!email || typeof email !== "string") {
    return json({ error: "Email is required" }, { status: 400 });
  }

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email)) {
    return json({ error: "Invalid email format" }, { status: 400 });
  }

  try {
    await saveEmailToDatabase(email, request);
    return json({
      message: "Subscribed successfully",
      status: "active",
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Email already exists") {
        return json({ error: "Email is already subscribed" }, { status: 409 });
      }
    }

    console.error(error);
    return json(
      { error: "An error occurred. Please try again." },
      { status: 500 },
    );
  }
};
