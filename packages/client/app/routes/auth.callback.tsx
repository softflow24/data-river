import {
  redirect,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  json,
} from "@remix-run/node";
import { supabase } from "~/utils/supabase.server";
import { getSession, commitSession } from "~/utils/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/editor";

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.session) {
      const session = await getSession(request.headers.get("Cookie"));
      session.set("access_token", data.session.access_token);
      session.set("user_id", data.session.user.id);

      return redirect(next, {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
  }

  return redirect("/sign-in");
}

export async function action({ request }: ActionFunctionArgs) {
  const { access_token } = await request.json();

  if (access_token) {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(access_token);

    if (error || !user) {
      return json({ error: "Invalid token" }, { status: 400 });
    }

    const session = await getSession(request.headers.get("Cookie"));
    session.set("access_token", access_token);
    session.set("user_id", user.id);

    return json(
      { success: true },
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      },
    );
  }

  return json({ error: "No token provided" }, { status: 400 });
}
