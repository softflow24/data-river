import type { MetaFunction } from "@remix-run/node";
import { Card, CardHeader, CardContent } from "@data-river/shared/ui";
import { AuthLayout } from "~/components/layout/auth-layout";
import { AuthForm } from "~/components/auth/auth-form";

export const meta: MetaFunction = () => {
  return [
    { title: "Sign In - Welcome Back" },
    { name: "description", content: "Sign in to your account" },
  ];
};

const SignInPage = () => {
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
          <AuthForm />
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default SignInPage;
