import { Outlet, useLoaderData } from "@remix-run/react";
import { type LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { getSession } from "~/utils/session.server";
import { supabase } from "~/utils/supabase.server";
import type { Database } from "~/types/supabase";
import { Navbar } from "~/components/layout/navbar";
import { CookieConsent } from "~/components/layout/cookie-consent";

type LoaderData = {
  profile: Pick<
    Database["public"]["Tables"]["profiles"]["Row"],
    "id" | "display_name" | "avatar_url" | "username"
  >;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("access_token")) {
    return redirect("/sign-in");
  }

  const userId = session.get("user_id") as string;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !profile) {
    throw new Error("Failed to load profile");
  }

  return json<LoaderData>({ profile });
}

export default function AppLayout() {
  const { profile } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen h-screen flex flex-col bg-background">
      <Navbar profile={profile} />
      <main className="flex-1 h-[calc(100vh-4rem)]">
        <Outlet />
      </main>
      <CookieConsent />
    </div>
  );
}
