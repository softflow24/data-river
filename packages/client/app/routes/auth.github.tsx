import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { createClient } from "~/utils/supabase.server";

export async function action({ request }: ActionFunctionArgs) {
  const { supabase, headers } = await createClient(request);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${new URL(request.url).origin}/auth/callback`,
    },
  });

  if (error) throw error;

  return redirect(data.url, {
    headers,
  });
}
