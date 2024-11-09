import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
import { type Database } from "~/types/supabase";
import { getSession } from "./session.server";
import { AuthApiError, SupabaseClient, User } from "@supabase/supabase-js";

if (!process.env.SUPABASE_URL) throw new Error("Missing SUPABASE_URL");
if (!process.env.SUPABASE_ANON_KEY)
  throw new Error("Missing SUPABASE_ANON_KEY");

type CreateClientReturnType = {
  supabase: SupabaseClient<Database>;
  headers: Headers;
  errorRefreshingSession: Error | null;
  getUser: () => Promise<User | null>;
};

export async function createClient(
  request: Request,
  skipRefresh = false,
): Promise<CreateClientReturnType> {
  const headers = new Headers();
  let getUser: () => Promise<User | null> = () => Promise.resolve(null);

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

    if (!session.get("access_token") || !session.get("refresh_token")) {
      console.log("Skipping refresh because no session found");
      return {
        supabase,
        headers,
        errorRefreshingSession,
        getUser,
      };
    }

    const { error } = await supabase.auth.setSession({
      access_token: session.get("access_token") as string,
      refresh_token: session.get("refresh_token") as string,
    });

    if (error) errorRefreshingSession = error;
  }

  getUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      return user;
    } catch (error) {
      if (error instanceof AuthApiError) {
        console.error("Error getting user", error.message);
      }

      return null;
    }
  };

  return { supabase, headers, errorRefreshingSession, getUser };
}
