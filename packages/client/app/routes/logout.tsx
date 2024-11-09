import { type ActionFunctionArgs, redirect } from "@remix-run/node";
import { getSession, destroySession } from "~/utils/session.server";
import { createClient } from "~/utils/supabase.server";

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const { supabase } = await createClient(request);

  // Sign out from Supabase
  await supabase.auth.signOut();

  // Destroy the session
  return redirect("/sign-in", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

// Redirect any direct access to this route
export async function loader() {
  return redirect("/");
}
