import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Card, CardHeader, CardContent } from "@data-river/shared/ui";
import { AuthLayout } from "~/components/layout/auth-layout";
import { AuthForm } from "~/components/auth/auth-form";
import { createClient } from "~/utils/supabase.server";
import { getSession, commitSession } from "~/utils/session.server";
import { useActionData } from "@remix-run/react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Sign In - Welcome Back" },
    { name: "description", content: "Sign in to your account" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabase } = await createClient(request, true);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/editor");
  }

  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const { supabase } = await createClient(request, true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    const session = await getSession(request.headers.get("Cookie"));
    session.set("access_token", data.session.access_token);
    session.set("user_id", data.user.id);
    session.set("refresh_token", data.session.refresh_token);
    session.set("expires_at", data.session.expires_at);

    return redirect("/editor", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    return json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 400 },
    );
  }
}

const SignInPage = () => {
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if we have an access token in the URL hash
    if (location.hash) {
      const params = new URLSearchParams(location.hash.substring(1));
      const accessToken = params.get("access_token");

      if (accessToken) {
        // Post the token to our callback endpoint
        fetch("/auth/callback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ access_token: accessToken }),
        }).then((response) => {
          if (response.ok) {
            navigate("/editor", { replace: true });
          }
        });
      }
    }
  }, [location.hash, navigate]);

  return (
    <AuthLayout>
      <Card className="mx-auto w-full max-w-md border-0 bg-transparent shadow-none">
        <CardHeader className="space-y-2">
          <h2 className="text-4xl font-bold">Welcome back</h2>
          <p className="text-base text-muted-foreground">
            Sign in to your account
          </p>
        </CardHeader>
        <CardContent className="pt-2">
          <AuthForm error={actionData?.error} />
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default SignInPage;
