import type { MetaFunction } from "@remix-run/node";
import { Card, CardHeader, CardContent } from "@data-river/shared/ui";
import { AuthLayout } from "~/components/layout/auth-layout";
import { ForgotPasswordForm } from "~/components/auth/forgot-password-form";
import Logo from "~/components/auth/logo";

export const meta: MetaFunction = () => {
  return [
    { title: "Reset Your Password" },
    { name: "description", content: "Reset your password via email" },
  ];
};

const ForgotPasswordPage = () => {
  return (
    <div className="flex flex-col gap-32">
      <div className="sticky top-0 mx-auto w-full max-w-7xl px-8 pt-6 sm:px-6 lg:px-8">
        <Logo />
      </div>
      <div className="flex w-full flex-col justify-center px-6 lg:px-10 xl:px-14">
        <Card className="mx-auto w-full max-w-md border-0 bg-transparent shadow-none">
          <CardHeader className="space-y-2">
            <h2 className="text-4xl font-bold">Reset your password</h2>
            <p className="text-base text-muted-foreground">
              Type in your email and we'll send you a link to reset your
              password
            </p>
          </CardHeader>
          <CardContent className="pt-2">
            <ForgotPasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
