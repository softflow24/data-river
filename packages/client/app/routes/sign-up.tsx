import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Card,
  CardHeader,
  CardContent,
  Input,
  Button,
  Label,
} from "@data-river/shared/ui";
import { AuthLayout } from "~/components/layout/auth-layout";
import { SignUpForm } from "~/components/auth/sign-up-form";
import { supabase } from "~/utils/supabase.server";
import { getSession, commitSession } from "~/utils/session.server";
import { useActionData } from "@remix-run/react";
import { useState } from "react";
import { Form } from "@remix-run/react";
import { useNavigate } from "@remix-run/react";

type ActionData = {
  error?: string;
  message?: string;
  step?: "verify" | "username";
  email?: string;
  oauth?: boolean;
};

export const meta: MetaFunction = () => {
  return [
    { title: "Sign Up - Get Started" },
    { name: "description", content: "Create a new account" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const accessToken = session.get("access_token");

  if (accessToken) {
    const {
      data: { user },
    } = await supabase.auth.getUser(accessToken);

    if (user) {
      // Check if user has username
      const { data: hasUsername } = await supabase.rpc("has_username", {
        user_id: user.id,
      });

      // If no username, redirect to username selection
      if (!hasUsername) {
        return json({
          step: "username",
          oauth: true,
          user_id: user.id,
          access_token: accessToken,
        });
      }

      // If has username, redirect to editor
      return redirect("/editor");
    }
  }

  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username") as string;

  // Handle username selection
  if (username) {
    try {
      const session = await getSession(request.headers.get("Cookie"));
      let userId = session.get("user_id") as string;

      // If userId is not in session, get it from form data
      if (!userId) {
        userId = formData.get("user_id") as string;
        session.set("user_id", userId);
      }

      if (!userId) {
        throw new Error("User ID not found");
      }

      const { error } = await supabase
        .from("profiles")
        .update({ username, display_name: username })
        .eq("id", userId);

      if (error) throw error;

      // For OAuth users, we already have the session
      if (!session.has("access_token")) {
        session.set("access_token", formData.get("access_token") as string);
        session.set("user_id", userId);
      }

      return redirect("/editor", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    } catch (error) {
      console.error(error);
      return json<ActionData>(
        {
          error:
            error instanceof Error ? error.message : "Username already taken",
          step: "username",
          oauth: formData.get("oauth") === "true",
        },
        { status: 400 },
      );
    }
  }

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

    const session = await getSession(request.headers.get("Cookie"));
    session.set("user_id", data.user.id);

    if (data.session === null) {
      return json<ActionData>(
        {
          message: "Please check your email to confirm your account",
          step: "verify",
          email,
        },
        {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        },
      );
    }

    return json<ActionData>(
      {
        step: "username",
        email,
      },
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      },
    );
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
  const navigate = useNavigate();

  // Show username selection form
  if (actionData?.step === "username") {
    return (
      <AuthLayout>
        <Card className="mx-auto w-full max-w-md border-0 bg-transparent shadow-none">
          <CardHeader className="space-y-2">
            <h2 className="text-4xl font-bold">Choose your username</h2>
            <p className="text-base text-muted-foreground">
              Pick a unique username for your account
            </p>
          </CardHeader>
          <CardContent className="pt-2">
            <Form method="post" className="space-y-4">
              {actionData.oauth && (
                <Input type="hidden" name="oauth" value="true" />
              )}
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium leading-none"
                >
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="w-full rounded-md border p-2"
                  placeholder="cooluser123"
                  pattern="[a-zA-Z0-9_]{3,}"
                  title="Username must be at least 3 characters and can only contain letters, numbers, and underscores"
                />
              </div>
              {actionData?.error && (
                <div className="text-sm text-red-500">{actionData.error}</div>
              )}
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </Form>
          </CardContent>
        </Card>
      </AuthLayout>
    );
  }

  if (actionData?.step === "verify") {
    return (
      <AuthLayout>
        <Card className="mx-auto w-full max-w-md border-0 bg-transparent shadow-none">
          <CardHeader className="space-y-2">
            <h2 className="text-4xl font-bold">Check your email</h2>
            <p className="text-base text-muted-foreground">
              We sent a verification link to {actionData.email}
            </p>
          </CardHeader>
        </Card>
      </AuthLayout>
    );
  }

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
