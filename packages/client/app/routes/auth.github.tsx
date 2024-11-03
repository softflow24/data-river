import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { supabase } from "~/utils/supabase.server";

export async function action({ request }: ActionFunctionArgs) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${new URL(request.url).origin}/sign-up`,
    },
  });

  if (error) throw error;

  return redirect(data.url);
}

export async function loader() {
  return redirect("/sign-up");
}
