import { Link, Form } from "@remix-run/react";
import { Button, Input, Label } from "@data-river/shared/ui";

interface ForgotPasswordFormProps {
  error?: string;
  success?: string;
}

export const ForgotPasswordForm = ({
  error,
  success,
}: ForgotPasswordFormProps) => {
  return (
    <div className="space-y-6 mx-auto">
      <Form method="post" className="space-y-5">
        {error && (
          <div className="text-sm text-red-500 text-center">{error}</div>
        )}
        {success && (
          <div className="text-sm text-green-500 text-center">{success}</div>
        )}

        <div className="space-y-3">
          <Label htmlFor="email" className="text-sm">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="h-11 text-base"
          />
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-focus text-focus-foreground hover:bg-focus/80 text-base"
        >
          Send reset email
        </Button>
      </Form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/sign-in"
          className="font-medium text-primary hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};
