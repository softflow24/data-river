import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Card, CardHeader, CardContent } from "@data-river/shared/ui";
import { AuthLayout } from "~/components/layout/auth-layout";
import { ForgotPasswordForm } from "~/components/auth/forgot-password-form";
import { supabase } from "~/utils/supabase.server";
import { getSession } from "~/utils/session.server";
import { useActionData } from "@remix-run/react";

type ActionData = {
  error?: string;
  message?: string;
};

export const meta: MetaFunction = () => {
  return [
    { title: "Reset Your Password" },
    { name: "description", content: "Reset your password via email" },
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

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${new URL(request.url).origin}/reset-password`,
    });

    if (error) throw error;

    return json<ActionData>({
      message: "Password reset instructions have been sent to your email",
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

const ForgotPasswordPage = () => {
  const actionData = useActionData<typeof action>();

  return (
    <AuthLayout>
      <Card className="mx-auto w-full max-w-md border-0 bg-transparent shadow-none">
        <CardHeader className="space-y-2">
          <h2 className="text-4xl font-bold">Reset your password</h2>
          <p className="text-base text-muted-foreground">
            Type in your email and we'll send you a link to reset your password
          </p>
        </CardHeader>
        <CardContent className="pt-2">
          <ForgotPasswordForm
            error={actionData?.error}
            success={actionData?.message}
          />
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
