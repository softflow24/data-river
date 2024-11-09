import { ActionFunctionArgs, json } from "@remix-run/node";
import { createClient } from "~/utils/supabase.server";
import { z } from "zod";

const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(30, "Username cannot exceed 30 characters")
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    "Username can only contain letters, numbers, underscores, and hyphens",
  );

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username") as string;

  const result = usernameSchema.safeParse(username);
  if (!result.success) {
    return json({
      error: result.error.errors[0].message,
    });
  }

  const { supabase } = await createClient(request);

  const { data } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", username)
    .single();

  return json({ isAvailable: !data });
}
