import { type ActionFunctionArgs, redirect } from "@remix-run/node";
import { getSession, destroySession } from "~/utils/session.server";

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

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
