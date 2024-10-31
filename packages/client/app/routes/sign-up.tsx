import type { MetaFunction } from "@remix-run/node";
import { Card, CardHeader, CardContent } from "@data-river/shared/ui";
import { AuthLayout } from "~/components/layout/auth-layout";
import { SignUpForm } from "~/components/auth/sign-up-form";

export const meta: MetaFunction = () => {
  return [
    { title: "Sign Up - Get Started" },
    { name: "description", content: "Create a new account" },
  ];
};

const SignUpPage = () => {
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
          <SignUpForm />
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default SignUpPage;
