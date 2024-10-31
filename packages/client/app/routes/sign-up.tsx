import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Card, CardHeader, CardContent } from "@data-river/shared/ui";
import { AuthLayout } from "~/components/layout/auth-layout";
import { SignUpForm } from "~/components/auth/sign-up-form";
import { supabase } from "~/utils/supabase.server";
import { getSession, commitSession } from "~/utils/session.server";
import { useActionData } from "@remix-run/react";

type ActionData = {
  error?: string;
  message?: string;
};

export const meta: MetaFunction = () => {
  return [
    { title: "Sign Up - Get Started" },
    { name: "description", content: "Create a new account" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("access_token")) {
    return redirect("/editor");
  }

  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${new URL(request.url).origin}/auth/callback`,
      },
    });

    if (error) throw error;

    if (!data.user) {
      throw new Error("User not found");
    }

    if (data.user?.identities?.length === 0) {
      throw new Error("Email already exists");
    }

    if (data.session === null) {
      return json<ActionData>({
        message: "Please check your email to confirm your account",
      });
    }

    const session = await getSession(request.headers.get("Cookie"));
    session.set("access_token", data.session.access_token);
    session.set("user_id", data.user.id);

    return redirect("/editor", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    return json<ActionData>(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 400 },
    );
  }
}

const SignUpPage = () => {
  const actionData = useActionData<typeof action>();

  return (
    <AuthLayout>
      <Card className="mx-auto w-full max-w-md border-0 bg-transparent shadow-none">
        <CardHeader className="space-y-2">
          <h2 className="text-4xl font-bold">Get started</h2>
          <p className="text-base text-muted-foreground">
            Create a new account
          </p>
        </CardHeader>
        <CardContent className="pt-2">
          <SignUpForm error={actionData?.error} success={actionData?.message} />
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default SignUpPage;
