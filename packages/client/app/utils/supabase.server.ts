import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
import { type Database } from "~/types/supabase";
import { getSession } from "./session.server";

if (!process.env.SUPABASE_URL) throw new Error("Missing SUPABASE_URL");
if (!process.env.SUPABASE_ANON_KEY)
  throw new Error("Missing SUPABASE_ANON_KEY");

export async function createClient(request: Request, skipRefresh = false) {
  const headers = new Headers();

  const supabase = await createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get("Cookie") ?? "");
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            headers.append(
              "Set-Cookie",
              serializeCookieHeader(name, value, options),
            ),
          );
        },
      },
    },
  );

  let errorRefreshingSession: Error | null = null;
  if (!skipRefresh) {
    const session = await getSession(request.headers.get("Cookie"));

    const { error } = await supabase.auth.setSession({
      access_token: session.get("access_token") as string,
      refresh_token: session.get("refresh_token") as string,
    });

    if (error) errorRefreshingSession = error;
  }

  return { supabase, headers, errorRefreshingSession };
}
