import { redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { getSession } from "./session.server";

export async function requireAuth(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("access_token")) {
    throw redirect("/sign-in");
  }

  return {
    userId: session.get("user_id"),
    accessToken: session.get("access_token"),
  };
}
